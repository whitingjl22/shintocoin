import React from "react"

class Buy extends React.Component {
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
    console.log(`Buy Button Clicked`)
    this.props.buyShintoCoinsFunc(this.state.amount)

    console.log(`resetting`)
    this.setState({
      amount: 0
    })
  }

  render() {
    console.log("Buy Page State:", this.state)
    console.log("Buy Page Props", this.props)
    return (
      <div>
        <h1>Buy ShintoCoin</h1>
        <p>
          Current ShintoCoin Value: {this.props.shintoValuation} <br />
          Number of ShintoCoins Owned: {this.props.userCoins}
        </p>
        <form onSubmit={this.handleSubmit}>
          <input className="buyInputBox" id="amount" type="number" placeholder="Number" min="1" onChange={this.handleChange} value={this.state.amount} />
          <button>Buy</button>
        </form>
      </div>
    )
  }
}

export default Buy
