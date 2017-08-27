import React from "react"
import classNames from "class-names"
import "./card.css"

export default class Card extends React.Component {

  handleClick = () => {
    if (this.props.canFlip) {
      this.props.card.flip()
      this.props.onFlip(this.props.photo, this.handleUnflipRequest)
    }
  }

  handleUnflipRequest = () => {
    this.props.card.flip()
  }

  render() {
    return (
      <div
        className="card"
        onClick={this.handleClick}>
        <div
          className={classNames("image", { flipped: this.props.card.flipped })}
          style={{ backgroundImage: `url(${this.props.photo})` }} />
      </div>
    )
  }

}
