import { observable, action } from "mobx"
import uuid from "uuid/v4"
import shuffle from "../shuffle"

const photos = [
  "/images/dog-1.jpg",
  "/images/dog-2.jpg",
  "/images/dog-3.jpg",
  "/images/dog-4.jpg",
  "/images/dog-5.jpg"
]

class Card {
  id
  photo
  @observable flipped = false
  @observable isMatched = false

  constructor(photo) {
    this.photo = photo
    this.id = uuid()
  }

  @action flip() {
    this.flipped = !this.flipped
  }

  @action done() {
    this.isMatched = true
  }
}

export default class GameStore {
  @observable cards = []
  @observable flippedCards = []

  constructor() {
    this.cards = this.duplicatedAndShuffledCards()
  }

  @action flip(card) {
    card.flip()
    this.flippedCards.push(card)

    if (this.flippedCards.length === 2) {
      const matchingCards = this.flippedCards.filter(flippedCard => flippedCard.photo === card.photo)
      if (matchingCards.length === 2) {
        matchingCards.forEach(card => card.done())
      }

      this.resetFlippedCards()
    }
  }

  @action resetFlippedCards() {
    setTimeout(() => {
      this.flippedCards.forEach(card => card.flip())
      this.flippedCards = []
    }, 500)
  }

  @action resetGame = () => {
    this.resetFlippedCards()
    this.cards = this.duplicatedAndShuffledCards()
  }

  duplicatedAndShuffledCards = () => (
    shuffle([...photos, ...photos]).map(photo =>
      new Card(photo)
    )
  )

  numberOfCardsLeft = () => (
    this.cards.filter(card => !card.isMatched).length
  )
}
