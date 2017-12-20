import React from "react"

export default class Subdivision extends React.Component {
  render() {
    const {
      subdivisions,
      subdivision,
    } = this.props

    return(
      <div className="control subdivisions">
        <label htmlFor="subdivision">Subdivision</label>
        <select
          name="subdivision"
          value={subdivision}
          onChange={this.handleChange}
        >
          {Object.keys(subdivisions).map(sd => {
            return(
              <option key={sd} value={subdivisions[sd]}>{sd}</option>
            )
          })}
        </select>
      </div>
    )
  }

  handleChange = (e) => {
    this.props.updateSubdivision(parseInt(e.target.value, 10))
  };
}
