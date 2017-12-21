import React from "react"

export default class SaveButton extends React.Component {
  render() {
    return(
      <div className="control save">
        <button onClick={this.save}>Save</button>
      </div>
    )
  }

  save = () => {
    let name = prompt("Give this groove a name:", `${this.props.name || "My Awesome Groove"}`)
    if (name) this.props.save(name)
  }
}
