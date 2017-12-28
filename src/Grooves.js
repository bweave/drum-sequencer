import React from "react"

export default class Grooves extends React.Component {
  render() {
    const { grooves } = this.props
    return(
      <div className="control load">
        <label htmlFor="load">Grooves</label>
        <select name="load" onChange={this.handleChange}>
          <option value="">Choose...</option>
          <optgroup label="Saved Grooves">
            {grooves.saved.length &&
              grooves.saved.map(groove => {
                return(<option key={groove.key} value={groove.key}>{groove.name}</option>)
              }
            )}
          </optgroup>
          <optgroup label="Presets">
            {grooves.presets.length &&
              grooves.presets.map(groove => {
                return(<option key={groove.key} value={groove.key}>{groove.name}</option>)
              })
            }
          </optgroup>
        </select>
      </div>
    )
  }

  handleChange = (e) => {
    if (e.target.value) this.props.load(e.target.value)
  }
}
