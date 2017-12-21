import React from "react"

export default class ShareLink extends React.Component {
  render() {
    return(
      <div className="share-link">
        <input id="share-link" value={this.props.link} readOnly />
        <button
          className="copy-share-link"
          data-clipboard-target="#share-link"
          onClick={this.handleClick}
        >Copy</button>
      </div>
    )
  }

  handleClick = (e) => {
    this.props.hide()
  }
}
