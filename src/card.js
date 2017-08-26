import React from "react"
import { inject, observer } from "mobx-react"
import classNames from "class-names"
import "./card.css"

@inject("cardsStore") @observer
export default class Card extends React.Component {

  handleClick = () => {
    if (!this.props.card.isMatched) {
      this.props.cardsStore.flipCard(this.props.card)
    }
  }

  render() {
    return (
      <div
        className={classNames("card", { isMatched: this.props.card.isMatched })}
        onClick={this.handleClick}>
        <div
          className={classNames("image", { flipped: this.props.card.isFlipped })}
          style={{ backgroundImage: `url(${this.props.card.photo})` }} />
      </div>
    )
  }

}
