import React from 'react'
import './Navbar.css'
import logo from '../assets/logo.png';
import ima from '../assets/ima.jpeg';

function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><img className = "image" src={logo} alt="logo" />  University Course Registration DAPP</a>
            {/* <form class="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> */}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
