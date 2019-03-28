//Does all the magic with the backend
app.post("/ledger", (request, response) => {
  console.log("I'm doing the needful!")
  var ledgerResponse
  var postRequest
  var value
  var coins

  //Get the current valuation and coins owned
  axios
    .get("http://5c9916454236560014393207.mockapi.io/shintobank/1")
    .then((ledgerGetResponse) => {
      value = parseInt(ledgerGetResponse.data.valuation)
      coins = parseInt(ledgerGetResponse.data.coinbank)
      console.log("Value ", value, "Coins ", coins)

      //Based on action either add or subtract
      if (request.body.action === "Mined" || request.body.action === "Bought") {
        value += parseInt(request.body.amount)
        coins += parseInt(request.body.amount)
      } else {
        value -= parseInt(request.body.amount)
        coins -= parseInt(request.body.amount)
      }

      //Update coin bank and value
      return axios.put("http://5c9916454236560014393207.mockapi.io/shintobank/1", { valuation: value, coinbank: coins })
    })
    .then((ledgerPutResponse) => {
      //Post transaction to the ledger
      postRequest = { ...request.body, valuation: value }
      return axios.post("http://5c9916454236560014393207.mockapi.io/ledger", postRequest)
    })
    .then((ledgerPostResponse) => {
      //Return the transaction and updated info
      return response.json({ ...ledgerPostResponse.data, coinbank: coins })
    })
    .catch((error) => {
      console.log("Something has gone tragically wrong")
    })
})
