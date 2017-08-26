import React from "react"
import classNames from "class-names"
import "./card.css"

export default class Card extends React.Component {

  handleClick = () => {
    if (this.props.canFlip) {
      this.props.onFlip(this.props.id)
    }
  }

  render() {
    return (
      <div
        className="card"
        onClick={this.handleClick}>
        <div
          className={classNames("image", { flipped: this.props.isFlipped })}
          style={{ backgroundImage: `url(${this.props.photo})` }} />
      </div>
    )
  }

}
