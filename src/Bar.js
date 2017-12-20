import React from "react"
import Beat from "./Beat"

export default class Bar extends React.Component {
  render() {
    const { beats, name, bar } = this.props
    return(
      <div className="bar">
        {beats.map(beat => {
          return(
            <Beat
              key={`${name}-bar${bar}-beat${beat}`}
              beat={beat}
              {...this.props}
            />
          )
        })}
      </div>
    )
  }
}
