import React from "react"
// import LedgerEntry from "../ledgerEntry/LedgerEntry"
// import "./Ledger.css"
import { Link } from "react-router-dom"

// const Ledger = (props) => {
//   let entries = props.ledger.map((entry) => (
//     <LedgerEntry action={entry.action} amount={entry.amount} valuation={entry.valuation} key={entry.id} id={entry.id} />
//   ))

//   return (
//     <div id="ledger">
//       <h1>Browse the Ledger</h1>
//       <p>Here you can browse all ShintoCoin transactions.</p>
//       <div id="ledgerTable">
//         <span>ShintoCoin Ledger</span>
//         <table>
//           <thead>
//             <tr>
//               <td>Action</td>
//               <td>Amount</td>
//               <td>Value</td>
//               <td>{/*Empty header to hold Details column space*/}</td>
//             </tr>
//           </thead>
//           <tbody>{entries}</tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

const Ledger = (props) => {
  return (
    <div>
      <h1>Browse the Ledger</h1>
      <p>Here you can browse all ShintoCoin transactions.</p>
      <div>
        <ul>
          {props.ledger.map((entry, idx) => {
            return (
              <li key={entry.id}>
                Action: {entry.action}
                Amount: {entry.amount}
                Valuation: {entry.valuation}
                Id: {entry.id}
                <Link to={"/transaction/" + props.id} className="details">
                  Details
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Ledger
