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

  render() {
    return (
      <div>
        {this.state.cards.map(card => (
          <Card
            key={card.id}
            canFlip={this.state.flippedCards.length < 2}
            onFlip={this.handleCardFlip}
            photo={card.photo} />
        ))}
      </div>
    )
  }

}
