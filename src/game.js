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
      flippedCards: [],
      matchedCards: []
    }
  }

  duplicatedAndShuffledCards = () => (
    shuffle([...photos, ...photos]).map(photo => ({
      photo,
      id: uuid()
    }))
  )

  handleCardFlip = (id, photo) => {
    const flippedCards = [...this.state.flippedCards, { id, photo }]
    this.setState({ flippedCards }, this.handleFlippedCardChange)
  }

  handleFlippedCardChange = () => {
    if (this.state.flippedCards.length === 2) {
      setTimeout(() => {
        if (this.state.flippedCards[0].photo === this.state.flippedCards[1].photo) {
          console.log("Match")
          const matchedCards = [...this.state.matchedCards, ...this.state.flippedCards]
          this.setState({ matchedCards })
        }
        this.setState({ flippedCards: [] })
      }, 1000)
    }
  }

  cardIsFlipped = card =>
    !!this.state.flippedCards.find(c => c.id === card.id)

  cardIsMatched = card =>
    !!this.state.matchedCards.find(c => c.id === card.id)

  render() {
    return (
      <div>
        {this.state.cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            canFlip={this.state.flippedCards.length < 2}
            onFlip={this.handleCardFlip}
            isFlipped={this.cardIsFlipped(card)}
            isMatched={this.cardIsMatched(card)}
            photo={card.photo} />
        ))}
      </div>
    )
  }

}
