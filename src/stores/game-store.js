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

  constructor(photo) {
    this.photo = photo
    this.id = uuid()
  }

  @action flip() {
    this.flipped = !this.flipped
  }
}

export default class GameStore {
  @observable cards = []

  constructor() {
    this.cards = this.duplicatedAndShuffledCards()
  }

  duplicatedAndShuffledCards = () => (
    shuffle([...photos, ...photos]).map(photo =>
      new Card(photo)
    )
  )
}
