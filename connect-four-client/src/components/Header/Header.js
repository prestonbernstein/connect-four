import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <div className='btn-group pull-right'>
      <button className='btn btn-success'>Signup</button>
      <button className='btn btn-info'>Login</button>
    </div>
    <h1>Connect Four</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/about' activeClassName='route--active'>
      About
    </Link>
  </div>
)

export default Header
