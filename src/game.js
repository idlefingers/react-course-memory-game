import React from "react"
import SuccessMessage from "./success-message"
import Card from "./card"
import { inject } from "mobx-react"

@inject("gameStore")
export default class Game extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      flippedCards: []
    }
  }

  handleCardFlip = (photo, unflipCallback) => {
    const flippedCards = [...this.state.flippedCards, { photo, unflipCallback }]
    this.setState({ flippedCards }, this.handleFlippedCardChange)
  }

  handleFlippedCardChange = () => {
    if (this.state.flippedCards.length === 2) {
      setTimeout(() => {
        if (this.state.flippedCards[0].photo === this.state.flippedCards[1].photo) {
          this.handleFlippedMatch()
        } else {
          this.handleFlippedMisMatch()
        }
      }, 500)
    }
  }

  handleFlippedMatch = () => {
    const cards = this.state.cards.filter(card => card.photo !== this.state.flippedCards[0].photo)
    this.setState({ cards, flippedCards: [] })
  }

  handleFlippedMisMatch = () => {
    this.state.flippedCards.forEach(card => {
      card.unflipCallback()
    })
    this.setState({ flippedCards: [] })
  }

  handleResetClick = () => {
    this.setState({
      cards: this.duplicatedAndShuffledCards(),
      flippedCards: []
    })
  }

  render() {
    const { cards } = this.props.gameStore

    return (
      <div className="game">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            canFlip={this.state.flippedCards.length < 2}
            onFlip={this.handleCardFlip}
            photo={card.photo} />
        ))}

        {cards.length === 0 &&
          <div>
            <SuccessMessage />
            <button onClick={this.handleResetClick}>Reset</button>
          </div>}
      </div>
    )
  }

}
