import React from "react"

export default class Note extends React.Component {
  render() {
    const { name, bar, beat, tick, notes, } = this.props
    const currentTiming = `${bar}.${beat}.${tick}`
    const note = notes.find(note => note.timing === currentTiming)
    const vol = note ? note.vol : 0

    return(
      <div className={`note ${name}`}>
        <input
          className="note"
          type="checkbox"
          name={name}
          id={`${name}-${bar}.${beat}.${tick}-note`}
          value={`${bar}.${beat}.${tick}`}
          data-vol={vol}
          checked={note ? true : false}
          onChange={this.handleChange}
        />
        <label htmlFor={`${name}-${bar}.${beat}.${tick}-note`}></label>
      </div>
    )
  }

  handleChange = (e) => {
    const currentVol = parseInt(e.target.dataset.vol, 10)
    let newVol = 0
    if (currentVol === 0) newVol = 2
    if (currentVol === 2) newVol = 1

    this.props.updateNotes(e.target.name, e.target.value, newVol)
  }
}
