import React from "react"
import uuid from "uuid/v4"
import Card from "./card"
import shuffle from "./shuffle"

const photos = [
  "/images/dog-1.jpg",
  "/images/dog-2.jpg",
  "/images/dog-3.jpg",
  "/images/dog-4.jpg",
  "/images/dog-5.jpg"
]

export default class Game extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cards: this.duplicatedAndShuffledCards(),
      flippedCards: []
    }
  }

  duplicatedAndShuffledCards = () => (
    shuffle([...photos, ...photos]).map(photo => ({
      photo,
      id: uuid()
    }))
  )

  handleCardFlip = cardId => {
    const flippedCards = [...this.state.flippedCards, cardId]
    this.setState({ flippedCards }, this.handleFlippedCardChange)
  }

  handleFlippedCardChange = () => {
    if (this.state.flippedCards.length === 2) {
      setTimeout(() => {
        this.setState({ flippedCards: [] })
      }, 1000)
    }
  }

  render() {
    return (
      <div>
        {this.state.cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            canFlip={this.state.flippedCards.length < 2}
            onFlip={this.handleCardFlip}
            isFlipped={this.state.flippedCards.indexOf(card.id) !== -1}
            photo={card.photo} />
        ))}
      </div>
    )
  }

}
