import React from "react"
import Note from "./Note"

export default class Beat extends React.Component {
  render() {
    const { name, bar, beat, ticks } = this.props
    return(
      <div className="notes">
        {ticks.map(tick => {
          return(
            <Note
              key={`${name}-bar${bar}-beat${beat}-tick${tick}`}
              tick={tick}
              {...this.props}
            />
          )
        })}
      </div>
    )
  }
}
