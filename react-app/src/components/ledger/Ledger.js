import React from "react"

const Ledger = (props) => {
  return (
    <div>
      <h1>Browse the Ledger</h1>
      <p>Here you can browse all ShintoCoin transactions.</p>
      <table>
        <thead>
          <tr>
            <td>Action</td>
            <td>Amount</td>
            <td>Value</td>
            <td>{/*Empty header to hold Details column space*/}</td>
          </tr>
        </thead>
        <tbody>{/* {entries} */}</tbody>
      </table>
    </div>
  )
}

export default Ledger
