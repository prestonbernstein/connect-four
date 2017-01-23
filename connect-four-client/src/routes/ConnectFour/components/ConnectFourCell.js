import React from 'react'

export const ConnectFourCell = (props) => (
  <li className='connect-four-cell'>
    <h2>{props.cellStatus}</h2>
  </li>
)

ConnectFourCell.propTypes = {
  cellStatus: React.PropTypes.number
}

export default ConnectFourCell
