import React from 'react'

export const ConnectFourCell = (props) => (
  <li className='connect-four-cell'>
    <div className="circle"/>
  </li>
)

ConnectFourCell.propTypes = {
  cellStatus: React.PropTypes.number
}

export default ConnectFourCell
