const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const axios = require("axios")

app.use(bodyParser.json())
app.use(express.static(__dirname + "./../react-app/build/"))

app.post("/ledger", (request, response) => {
  console.log("request body:", request.body)
  let ledgerResponse
  let value
  let coins

  // get shinto bank
  // calculate change in coins and value
  // put new coins and value to shintobank
  // post ledger entry to ledger
  // return ledger entry and value and coins

  // Get the current valuation and coins owned
  axios
    .get("http://5c992ab94236560014393239.mockapi.io/shintobank/1")
    .then((ledgerGetResponse) => {
      console.log("ledgerGetResponse:", ledgerGetResponse.data)

      value = parseInt(ledgerGetResponse.data.valuation)
      coins = parseInt(ledgerGetResponse.data.coinbank)
      console.log("Value:", value, "Coins:", coins)

      // Based on action either add or submit
      if (request.body.action === "Mined" || request.body.action === "Bought") {
        value += parseInt(request.body.amount)
        coins += parseInt(request.body.amount)
      } else {
        value -= parseInt(request.body.amount)
        coins -= parseInt(request.body.amount)
      }
      console.log("After if/else", "Value:", value, "Coins:", coins)

      // Update coinbank and valuation
      return axios.put("http://5c992ab94236560014393239.mockapi.io/shintobank/1", { valuation: value, coinbank: coins })
    })
    .then((ledgerPutResponse) => {
      console.log("ledgerPutResponse:", ledgerPutResponse.data)

      // Post transaction to the ledger
      postRequest = { ...request.body, valuation: value }
      console.log("postRequest:", postRequest)
      return axios.post("http://5c992ab94236560014393239.mockapi.io/ledger", postRequest)
    })
    .then((ledgerPostResponse) => {
      console.log("ledgerPostResponse", ledgerPostResponse.data)
      console.log("coinbank:", coins)

      // Return the transaction and updated info
      return response.json({ ...ledgerPostResponse.data, coinbank: coins })
    })
    .catch((error) => {
      console.log("ERROR", error)
    })
})

// Get current ledger, coins, and value
app.get("/ledger", (request, response) => {
  console.log("Get Everything")
  let value, coins

  axios
    .get("http://5c992ab94236560014393239.mockapi.io/shintobank/1")
    .then((bankGetResponse) => {
      value = parseInt(bankGetResponse.data.valuation)
      coins = parseInt(bankGetResponse.data.coinbank)
      console.log("Value ", value, "Coins ", coins)

      return axios.get("http://5c992ab94236560014393239.mockapi.io/ledger")
    })
    .then((ledgerGetResponse) => {
      return response.json({ ledger: ledgerGetResponse.data, valuation: value, coinbank: coins })
    })
})

// Get current ledger, coins, and value for ledger transaction details
app.get("/ledger/:id", (request, response) => {
  console.log("Fetching ledger transaction details")

  axios.get(`http://5c992ab94236560014393239.mockapi.io/ledger/${request.params.id}`).then((ledgerGetResponse) => {
    return response.json(ledgerGetResponse.data)
  })
})

// This is currently not working...
app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname + "/../react-app/build/index.html"))
})

// SERVER LISTENING
app.listen(1337, () => {
  console.log("Server restarted...")
})
