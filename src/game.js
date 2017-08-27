import React from "react"
import SuccessMessage from "./success-message"
import Card from "./card"
import { inject, observer } from "mobx-react"

@inject("gameStore") @observer
export default class Game extends React.Component {

  render() {
    const { cards } = this.props.gameStore

    return (
      <div className="game">
        {this.props.gameStore.numberOfCardsLeft() > 0 &&
          cards.map(card => (
            <Card key={card.id} card={card} />
          ))}

        {this.props.gameStore.numberOfCardsLeft() === 0 &&
          <div>
            <SuccessMessage />
            <button onClick={this.props.gameStore.resetGame}>Reset</button>
          </div>}
      </div>
    )
  }

}
