import React from 'react'
import './App.css'
import Sequencer from "./SequencerV2"
import PlayButton from "./PlayButton"
import Subdivision from "./Subdivision"
import Tempo from "./Tempo"
import Instrument from "./Instrument"

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.sequencer = new Sequencer()
    this.state = {...this.props}
  }

  componentDidUpdate(prevProps, prevState) {
    // TODO: this is a super simple implementation
    // If we were playing, and are still playing, restart with the new state
    if (prevState.isPlaying && this.state.isPlaying) {
      this.sequencer.stop()
      this.sequencer.play(this.state)
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

    const possibleNotes = Array.from(Array(subdivision).keys())
    const instruments = Object.keys(notes)

    return (
      <div className="wrapper">
        <div className="controls">
          <PlayButton
            isPlaying={isPlaying}
            togglePlay={this.togglePlay.bind(this)}
          />
          <Subdivision
            subdivisions={subdivisions}
            subdivision={subdivision}
            updateSubdivision={this.updateSubdivision.bind(this)}
          />
          <Tempo
            tempo={tempo}
            updateTempo={this.updateTempo.bind(this)}
          />
        </div>

        <div className="staff">
          {instruments.map((instrument, i) => {
            return(
              <Instrument
                key={`${instrument}-${i}`}
                name={instrument}
                possibleNotes={possibleNotes}
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
    this.setState({ isPlaying: !this.state.isPlaying }, function() {
      if (this.state.isPlaying) {
        this.sequencer.play(this.state)
      } else {
        this.sequencer.stop()
      }
    })
  }

  updateSubdivision(value) {
    const { state:newState } = this
    newState.subdivision = value
    this.setState(newState)
  }

  updateTempo(value) {
    const { state:newState } = this
    newState.tempo = value
    this.setState(newState)
  }

  updateNotes(instrument, value, volume) {
    const { state:newState } = this
    const newNotes = newState.notes[instrument]

    if (volume === 0 && Object.keys(newNotes).includes(value)) {
      delete newNotes[value]
    } else {
      newNotes[value] = { volume: volume }
    }
    newState.notes[instrument] = newNotes

    this.setState(newState)
  }
}
