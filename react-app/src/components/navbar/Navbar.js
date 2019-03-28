import React from "react"
import "react-router"
import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = (props) => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/mine">Mine Coins</Link>
        </li>
        <li>
          <Link to="/buy">Buy Coins</Link>
        </li>
        <li>
          <Link to="/sell">Sell Coins</Link>
        </li>
        <li>
          <Link to="/ledger">Browse Ledger</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
