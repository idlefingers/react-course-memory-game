import React from "react"
import { inject, observer } from "mobx-react"
import Card from "./card"

@inject("cardsStore") @observer
export default class Game extends React.Component {

  render() {
    return (
      <div>
        {this.props.cardsStore.cards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    )
  }

}
