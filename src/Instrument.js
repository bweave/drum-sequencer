import _ from "lodash"
import React from "react"
import Bar from "./Bar"

export default class Instrument extends React.Component {
  render() {
    const { name, notes, } = this.props
    const bar = 1
    const beats = _.range(1, 5)
    const ticks = _.range(1, (this.props.subdivision / 4) + 1)

  return(
    <div className={`instrument ${this.props.name}`} >
      <div className="name">
        {_.startCase(name)}
      </div>
      <div className="bars">
          <Bar
              key={`${name}-bar-${bar}`}
              name={name}
              bar={bar}
              beats={beats}
              ticks={ticks}
              notes={notes}
              updateNotes={this.props.updateNotes}
            />
        </div>
      </div>
    )
  }
}
