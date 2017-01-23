import React from 'react'
import './Header.scss'

export const Header = () => (
  <div>
    <div className='btn-group pull-right'>
      <button className='btn btn-success'>Signup</button>
      <button className='btn btn-info'>Login</button>
    </div>
    <h1>Connect Four</h1>
  </div>
)

export default Header
