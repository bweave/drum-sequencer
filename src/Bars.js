import React from "react"

export default class Bars extends React.Component {
  render() {
    return(
      <div className="control bars">
        <select onChange={this.handleChange} value={this.props.bars}>
          {[1,2].map(i => <option key={`bar-option-${i}`} value={i}>{i} Bar(s)</option>)}
        </select>
      </div>
    )
  }

  handleChange = (e) => {
    this.props.updateBars(parseInt(e.target.value, 10))
  }
}
