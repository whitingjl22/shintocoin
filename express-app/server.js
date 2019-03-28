const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const axios = require("axios")

app.use(bodyParser.json())
app.use(express.static("./../react-app/build/"))

app.post("/ledger", (request, response) => {
  var ledgerResponse

  //get shinto bank
  //calculate change in coins and value
  //put new coins and value to shintobank
  //post ledger entry to ledger
  //return ledger entry and value and coins

  axios.post("http://5c992ab94236560014393239.mockapi.io/ledger", request.body).then((mockApiPostResponse) => {
    console.log(mockApiPostResponse)
    // return response.json(mockApiPostResponse.data)

    ledgerResponse = mockApiPostResponse.data
    return axios.get("http://5c992ab94236560014393239.mockapi.io/shintobank/1")
  })
})

// SERVER LISTENING
app.listen(1337, () => {
  console.log("Server restarted...")
})
