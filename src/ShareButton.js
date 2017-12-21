import React from "react"

export default class ShareButton extends React.Component {
  render() {
    return(
      <div className="control share">
        <button onClick={this.handleClick}>Share</button>
      </div>
    )
  }

  handleClick = (e) => {
    this.props.share()
  }
}
