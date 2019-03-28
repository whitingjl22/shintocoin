import React from "react"
import "./Mine.css"

class Mine extends React.Component {
  constructor(props) {
    super(props)
    this.state = { answer: "" }
  }

  handleChange = (e) => {
    console.log(`changing ${e.target.id}`)
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(`Mine Button Clicked`)

    if (this.state.answer === "yes") {
      this.props.mineShintoCoinFunc()
    } else {
      alert(`You answered "No" to Mine ShintoCoins`)
    }

    console.log(`resetting`)
    e.target.reset()
    this.setState({
      answer: ""
    })
  }

  render() {
    console.log("Mine Page State:", this.state)
    return (
      <div>
        <h1>Mine ShintoCoins</h1>
        <p>
          Here you can mine ShintoCoins by being the first to solve the algorithm: <br />
          Do you want to mine a ShintoCoin? (yes/no)
        </p>
        <form onSubmit={this.handleSubmit}>
          <input className="mineInputBox" id="answer" type="text" placeholder="Answer" onChange={this.handleChange} />
          <button>Mine</button>
        </form>
      </div>
    )
  }
}

export default Mine
