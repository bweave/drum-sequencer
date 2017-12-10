import _ from "lodash"
import React from "react"

export default class Instrument extends React.Component {
  render() {
    const {
      name,
      possibleNotes,
      notes,
    } = this.props

    return(
      <div className={`instrument ${this.props.name}`} >
        <div className="name">
          {_.startCase(name)}
        </div>
        <div className="possible-notes">
          {possibleNotes.map(i => {
            const checked = Object.keys(notes).includes(i.toString())
            let volume = "0"

            if (checked) {
              volume = notes[i.toString()].volume
            }

            return(
              <div key={`${name}-${i}`} className={`possible-note ${name}`}>
                <input
                  className="note"
                  type="checkbox"
                  id={`${name}-${i}`}
                  name={name}
                  value={i}
                  data-volume={volume}
                  checked={checked}
                  onChange={this.handleChange}
                />
                <label htmlFor={`${name}-${i}`}></label>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  handleChange = (e) => {
    const currentVolume = parseInt(e.target.dataset.volume, 10)
    let newVolume = 0
    if (currentVolume === 0) newVolume = 2
    if (currentVolume === 2) newVolume = 1

    this.props.updateNotes(e.target.name, e.target.value, newVolume)
  };
}
