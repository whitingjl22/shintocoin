import React from "react"

class Sell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0
    }
  }

  handleChange = (e) => {
    console.log(`changing ${e.target.id}`)
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(`Sell Button Clicked`)

    if (this.props.userCoins > 0 && this.props.userCoins >= this.state.amount) {
      this.props.sellShintoCoinsFunc(this.state.amount)
    }

    console.log(`resetting`)
    this.setState({
      amount: 0
    })
  }

  render() {
    console.log("Sell Page State:", this.state)
    console.log("Sell Page Props", this.props)
    return (
      <div>
        <h1>Sell ShintoCoins</h1>
        <p>
          Current ShintoCoin Value: {this.props.shintoValuation} <br />
          Number of ShintoCoins Owned: {this.props.userCoins}
        </p>
        <form onSubmit={this.handleSubmit}>
          <input
            className="sellInputBox"
            id="amount"
            type="number"
            placeholder="Number"
            min="1"
            onChange={this.handleChange}
            value={this.state.amount}
          />
          <button>Sell</button>
        </form>
      </div>
    )
  }
}

export default Sell
