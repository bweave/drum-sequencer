import React from "react"

export default class PlayButton extends React.Component {
  render() {
    return(
      <div className="control play">
        <button onClick={this.handleClick}>
          {this.props.isPlaying ? "Stop" : "Play"}
        </button>
      </div>
    )
  }

  handleClick = () => {
    this.props.togglePlay()
  };
}
