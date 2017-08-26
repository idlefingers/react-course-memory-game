import uuid from "uuid/v4"
import { observable, action } from "mobx"
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
  @observable isFlipped = false
  @observable isMatched = false

  constructor(photo) {
    this.id = uuid()
    this.photo = photo
  }

  @action flip() {
    this.isFlipped = !this.isFlipped
  }

  @action done() {
    this.isMatched = true
  }
}

export default class CardsStore {
  @observable cards = []
  @observable flippedCards = []

  constructor() {
    this.cards = shuffle([...photos, ...photos]).map(photo =>
      new Card(photo)
    )
  }

  @action flipCard(card) {
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

}
