import React from "react"

export default class Tempo extends React.Component {
  render() {
    return(
      <div className="control tempo">
        <label htmlFor="tempo">Tempo</label>
        <input
          name="tempo"
          type="range"
          value={this.props.tempo}
          step="1"
          min="60"
          max="240"
          onChange={this.handleChange}
        />
        <output htmlFor="tempo">{this.props.tempo}</output>
      </div>
    )
  }

  handleChange = (e) => {
    this.props.updateTempo(parseInt(e.target.value, 10))
  };
}
