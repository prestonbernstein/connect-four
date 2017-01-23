import React from 'react'
import '../assets/ConnectFour.scss'

import ConnectFourControls from './ConnectFourControls'
import ConnectFourBoard from './ConnectFourBoard'

export const ConnectFourIndex = (props) => (
  <div>
    <ConnectFourControls />
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
