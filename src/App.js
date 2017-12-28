import _ from "lodash"
import localforage from "localforage"
import React from 'react'
import './App.css'
import Sequencer from "./Sequencer"
import PlayButton from "./PlayButton"
import Subdivision from "./Subdivision"
import Tempo from "./Tempo"
import presets from "./presets"
import Grooves from "./Grooves"
import SaveButton from "./SaveButton"
import ShareButton from "./ShareButton"
import Instrument from "./Instrument"
import ShareLink from "./ShareLink"
import translateSubdivision from './translateSubdivision';

export default class App extends React.Component {
  state = {...this.props}
  sequencer = new Sequencer()

  componentWillMount() {
    this.ensurePresetsAreAvailable().then(resp => {
      this.fetchSavedGrooves().then(() => {
        this.decodeSharedLink()
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.name !== this.state.name) {
      this.fetchSavedGrooves()
      return
    }

    if (prevState.subdivision !== this.state.subdivision) {
      this.setState({ notes: translateSubdivision(
        prevState.subdivision,
        this.state.subdivision,
        this.state.notes)
      })
    }

    // from stopped to playing
    if (!prevState.isPlaying && this.state.isPlaying) {
      // start timer-worker and pass state to sequencer.play
      this.sequencer.timerWorker.postMessage("start")
      this.sequencer.play(this.state)
    }
    // from playing to playing, maybe with new state
    if (prevState.isPlaying && this.state.isPlaying) {
      // pass state to sequencer.play, but don't change timer-worker
      this.sequencer.play(this.state)
    }
    // from playing to stopped
    if (prevState.isPlaying && !this.state.isPlaying) {
      // tell timer-worker to stop, and release audio???
      this.sequencer.timerWorker.postMessage("stop")
      this.sequencer.stop()
    }
  }

  render() {
    const { isPlaying, subdivisions, subdivision, tempo, notes, grooves } = this.state

    return (
      <div className="wrapper">
        <h1 className="title">{this.state.name || "Untitled"}</h1>
        <div className="controls">
          <PlayButton
            isPlaying={isPlaying}
            togglePlay={this.togglePlay.bind(this)}
          />
          <ShareButton share={this.share.bind(this)} />
          <SaveButton name={this.state.name} save={this.save.bind(this)} />
          <Grooves grooves={grooves} load={this.load.bind(this)} />
          <Tempo
            tempo={tempo}
            updateTempo={this.updateTempo.bind(this)}
          />
          <Subdivision
            subdivisions={subdivisions}
            subdivision={subdivision}
            updateSubdivision={this.updateSubdivision.bind(this)}
          />
        </div>

        <div className="staff">
          {Object.keys(notes).map(instrument => {
            return(
              <Instrument
                key={instrument}
                name={instrument}
                subdivision={subdivision}
                notes={notes[instrument]}
                updateNotes={this.updateNotes.bind(this)}
              />
            )}
           )}
        </div>
        {this.state.shareLink &&
          <ShareLink link={this.state.shareLink} hide={this.hideShareLink.bind(this)} />
        }
      </div>
    )
  }

  ensurePresetsAreAvailable() {
    return Promise.all(Object.keys(presets).map(key => {
      const storageKey = `drum_sequencer_preset_${key}`
      return localforage.setItem(storageKey, { key: storageKey, ...presets[key]})
    })).then(resp => resp)
  }

  fetchSavedGrooves() {
    const grooves = Object.assign({}, this.state.grooves)
    return localforage.keys().then(storedKeys => {
      const keysToFetch = storedKeys.filter(storedKey => {
        return !(
          grooves.saved.map(groove => groove.key).concat(
          grooves.presets.map(groove => groove.key)
        )).includes(storedKey)
      })
      Promise.all(keysToFetch.map(key => {
        return localforage.getItem(key)
      })).then(fetchedGrooves => {
        fetchedGrooves.forEach(groove => {
          if (groove.key.includes("drum_sequencer_preset_")) {
            grooves.presets.push({key: groove.key, name: groove.name})
          } else if (groove.key.includes("drum_sequencer_")) {
            grooves.saved.push({ key: groove.key, name: groove.name })
          }
        })
        this.setState({ grooves })
      })
    })
  }

  togglePlay() {
    this.setState({ isPlaying: !this.state.isPlaying })
  }

  updateSubdivision(subdivision) {
    this.setState({ subdivision })
  }

  updateTempo(value) {
    const { state:newState } = this
    newState.tempo = value
    this.setState(newState)
  }

  updateNotes(instrument, timing, vol) {
    const notes = Object.assign({}, this.state.notes)
    const existingNoteIndex = notes[instrument].findIndex(note => note.timing === timing)
    if (existingNoteIndex === -1) { // note is new so add it
      notes[instrument].push({ timing, vol })
    } else if (existingNoteIndex > -1 && vol === 0) { // note vol is 0 so remove it
      notes[instrument].splice([existingNoteIndex], 1)
    } else if (existingNoteIndex > -1 && vol > 0) { // set note vol to new vol
      notes[instrument][existingNoteIndex].vol = vol
    }
    const newState = Object.assign({}, this.state, { notes })
    this.setState(newState)
  }

  save(name) {
    this.togglePlay()
    const storageKey = _.escape(_.trim(_.snakeCase(`drum_sequencer_${name}`)))
    const { tempo, subdivision, bars, beatsPerBar, beat, notes } = this.state
    localforage
      .setItem(storageKey, {
        key: storageKey,
        name,
        tempo,
        subdivision,
        bars,
        beatsPerBar,
        beat,
        notes
      })
      .then(resp => this.setState({ name: resp.name }))
      .catch(err => console.log(err))
  }

  load(key) {
    localforage
      .getItem(key)
      .then(resp => {
        if (!resp) return
        const newState = Object.assign({}, resp, {key: undefined})
        this.setState(newState)
      })
      .catch(err => console.log(err))
  }

  share() {
    const { name = "Untitled", tempo, subdivision, bars, beatsPerBar, beat, notes } = this.state
    // TODO: would it be worth making this link prettier?
    const shareLink = `${window.location.href}?name=${encodeURIComponent(name)}&tempo=${tempo}&subdivision=${subdivision}&bars=${bars}&beatsPerBar=${beatsPerBar}&beat=${beat}&notes=${encodeURIComponent(JSON.stringify(notes))}`

    this.setState({ shareLink })
  }

  decodeSharedLink() {
    const params = new URLSearchParams(window.location.search)
    if (Array.from(params).length < 1) return
    this.setState({
      name: params.get("name"),
      tempo: _.parseInt(params.get("tempo")),
      subdivision: _.parseInt(params.get("subdivision")),
      bars: _.parseInt(params.get("bars")),
      beatsPerBar: _.parseInt(params.get("beatsPerBar")),
      beat: _.parseInt(params.get("beat")),
      notes: JSON.parse(decodeURIComponent(params.get("notes"))),
    })
  }

  hideShareLink() {
    setTimeout(() => this.setState({ shareLink: undefined }), 500)
  }
}
