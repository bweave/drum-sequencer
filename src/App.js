import React from 'react'
import './App.css'
import Sequencer from "./Sequencer"
import PlayButton from "./PlayButton"
import Subdivision from "./Subdivision"
import Tempo from "./Tempo"
import Instrument from "./Instrument"
import translateSubdivision from './translateSubdivision';

export default class App extends React.Component {
  state = {...this.props}
  sequencer = new Sequencer()

  componentDidUpdate(prevProps, prevState) {
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
    const {
      isPlaying,
      subdivisions,
      subdivision,
      tempo,
      notes,
    } = this.state

    return (
      <div className="wrapper">
        <div className="controls">
          <PlayButton
            isPlaying={isPlaying}
            togglePlay={this.togglePlay.bind(this)}
          />
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
      </div>
    )
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
}
