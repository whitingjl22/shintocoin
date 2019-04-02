import React from "react"
import LedgerEntry from "../ledgerEntry/LedgerEntry"
import "./Ledger.css"

const Ledger = (props) => {
  var entries = props.ledger.map((entry) => (
    <LedgerEntry action={entry.action} amount={entry.amount} valuation={entry.valuation} key={entry.id} id={entry.id} />
  ))

  return (
    <div id="ledger">
      <h1>Browse the Ledger</h1>
      <p>Here you can browse all ShintoCoin transactions.</p>
      <div id="ledgerTable">
        <span style={{ marginLeft: "10px" }}>ShintoCoin Ledger</span>
        <br />
        <br />
        <table className="ledgerTable">
          <thead>
            <tr>
              <th>Action</th>
              <th>Amount</th>
              <th>Value</th>
              <th>{/*Empty header to hold Details column space*/}</th>
            </tr>
          </thead>
          <tbody>{entries}</tbody>
        </table>
      </div>
    </div>
  )
}

export default Ledger
