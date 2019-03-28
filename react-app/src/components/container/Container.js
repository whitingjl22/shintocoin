import React from "react"
import Navbar from "../navbar/Navbar"
import "react-router"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import axios from "axios"

import Home from "./../home/Home"
import Mine from "../mine/Mine"

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userCoins: 0,
      ledger: [],
      shintoValuation: 1
    }
  }

  mineShintoCoin = () => {
    console.log("mineShintoCoinFunc called")

    axios.post("/ledger", { action: "Mined", amount: 1 }).then((response) => {
      console.log(response.data)
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />

          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home" component={Home} />
            <Route path="/mine" render={() => <Mine mineShintoCoinFunc={this.mineShintoCoin} />} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default Container
