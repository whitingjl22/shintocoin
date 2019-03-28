const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const axios = require("axios")

app.use(bodyParser.json())
app.use(express.static("./../react-app/build/"))

app.post("/ledger", (request, response) => {
  console.log("request body:", request.body)
  var ledgerResponse
  var value
  var coins

  //get shinto bank
  //calculate change in coins and value
  //put new coins and value to shintobank
  //post ledger entry to ledger
  //return ledger entry and value and coins

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
      console.log("postRequest", request.body) // I AM HERE
      return axios.post("http://5c992ab94236560014393239.mockapi.io/ledger", postRequest)
    })
    .then((ledgerPostResponse) => {
      //Return the transaction and updated info
      return response.json({ ...ledgerPostResponse.data, coinbank: coins })
    })
    .catch((error) => {
      console.log("ERROR")
    })
})

// SERVER LISTENING
app.listen(1337, () => {
  console.log("Server restarted...")
})
