import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "mobx-react"
import Game from "./game"
import CardsStore from "./stores/cards-store"

import './index.css'

const stores = {
  cardsStore: new CardsStore()
}

const App = () =>
  <Provider {...stores}>
    <Game />
  </Provider>

ReactDOM.render(<App />, document.getElementById('root'));
