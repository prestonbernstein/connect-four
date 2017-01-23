import React from 'react'
import '../assets/ConnectFour.scss'

import ConnectFourBoard from './ConnectFourBoard'

export const ConnectFourIndex = (props) => (
  <div>
    <ConnectFourBoard
      board={props.board}
    />
  </div>
)

ConnectFourIndex.propTypes = {
  board: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.number
    )
  )
}

export default ConnectFourIndex
