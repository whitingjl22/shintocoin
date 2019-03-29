import React from "react"
import { Link } from "react-router-dom"

const LedgerEntry = (props) => {
  return (
    <tr>
      <td>{props.action}</td>
      <td>{props.amount}</td>
      <td>{props.valuation}</td>
      <td>
        <Link to={"/transaction/" + props.id} className="details">
          Details
        </Link>
      </td>
    </tr>
  )
}

export default LedgerEntry
