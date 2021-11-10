import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import Menu from './Menu'

const Header = () => {
 
 
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
  <div className="container-fluid">
    <Link className="navbar-brand" to='/'>BlogAlex</Link>
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <Search/>
    <Menu/>
     
     
    </div>
  </div>
</nav>
    </div>
  )
}

export default Header
