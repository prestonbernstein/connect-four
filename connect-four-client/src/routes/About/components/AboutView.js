import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './AboutView.scss'

export const AboutView = () => (
  <div>
    <h4>About</h4>
    <img
      alt='This is a duck, because Redux!'
      className='duck'
      src={DuckImage} />
  </div>
)

export default AboutView
