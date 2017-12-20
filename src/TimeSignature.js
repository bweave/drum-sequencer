import React from "react"

export default class TimeSignature extends React.Component {
  state = { editing: false }

  showForm = (e) => {
    this.setState({editing: true})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const beatsPerBar = parseInt(e.target.beatsPerBar.value, 10)
    const beat = parseInt(e.target.beats.value, 10)
    this.props.updateTimeSignature(beatsPerBar, beat)
    this.setState({ editing: false })
  }

  render() {
    const {
      beatsPerBar,
      beat,
      beats,
    } = this.props

    return(
      <div className="control time-signature">
        <label>Time Signature</label>
        {!this.state.editing &&
          <div>
            {`${beatsPerBar}/${beat}`}
            <button onClick={this.showForm}>Edit</button>
          </div>
        }
        {this.state.editing &&
          <form onSubmit={this.handleSubmit}>
            <input
              name="beatsPerBar"
              defaultValue={beatsPerBar}
            />
            <select
              name="beats"
              defaultValue={beat}
            >
              {Object.keys(beats).map(beat => {
                return(
                  <option key={`beats-${beat}`} value={beats[beat]}>{beats[beat]}</option>
                )
              })}
            </select>
            <button type="submit">Save</button>
          </form>
        }
      </div>
    )
  }
}
