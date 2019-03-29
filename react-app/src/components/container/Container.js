import React from "react"
import Navbar from "../navbar/Navbar"
import "react-router"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import axios from "axios"

import Home from "./../home/Home"
import Mine from "../mine/Mine"
import Buy from "../buy/Buy"
import Sell from "../sell/Sell"
import Ledger from "../ledger/Ledger"
import Transaction from "../transaction/Transaction"

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userCoins: 0,
      ledger: [], // action:, amount:
      shintoValuation: 1
    }
  }

  componentDidMount() {
    console.log("componentDidMount")

    axios
      .get("http://localhost:1337/ledger")
      .then((response) => {
        console.log(response.data)

        this.setState({
          userCoins: response.data.coinbank,
          ledger: response.data.ledger,
          shintoValuation: response.data.valuation
        })
      })
      .catch((error) => {
        console.log("Container componentDidMount Error", error)
      })
  }

  updateDataStore = (action, amount) => {
    axios.post("http://localhost:1337/ledger", { action, amount }).then((response) => {
      console.log("post response coming back from server:", response.data)

      this.setState({
        userCoins: response.data.coinbank,
        ledger: [
          ...this.state.ledger,
          {
            id: response.data.id,
            action: response.data.action,
            createdAt: response.data.createdAt,
            amount: response.data.amount,
            valuation: response.data.valuation
          }
        ],
        shintoValuation: response.data.valuation
      })
    })
  }

  mineShintoCoin = () => {
    console.log("mineShintoCoinFunc called")
    this.updateDataStore("Mined", 1)
  }

  buyShintoCoins = (amount) => {
    console.log("buyShintoCoinsFunc called")
    this.updateDataStore("Bought", amount)
  }

  sellShintoCoins = (amount) => {
    console.log("sellShintoCoinsFunc called")
    this.updateDataStore("Sold", amount)
  }

  render() {
    console.log("Container Page State:", this.state)
    console.log("LEDGER", this.state.ledger)
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home" component={Home} />
            <Route path="/mine" render={() => <Mine mineShintoCoinFunc={this.mineShintoCoin} />} />
            <Route
              path="/buy"
              render={() => (
                <Buy
                  buyShintoCoinsFunc={this.buyShintoCoins}
                  userCoins={this.state.userCoins}
                  shintoValuation={this.state.shintoValuation}
                />
              )}
            />
            <Route
              path="/sell"
              render={() => (
                <Sell
                  sellShintoCoinsFunc={this.sellShintoCoins}
                  userCoins={this.state.userCoins}
                  shintoValuation={this.state.shintoValuation}
                />
              )}
            />
            <Route path="/ledger" render={() => <Ledger ledger={this.state.ledger} />} />
            <Route path="/transaction/:id" render={(props) => <Transaction {...props} />} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default Container
