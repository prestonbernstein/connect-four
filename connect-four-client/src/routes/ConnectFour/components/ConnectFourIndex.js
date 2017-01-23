import React from 'react'
import '../assets/ConnectFour.scss'

import ConnectFourControls from './ConnectFourControls'
import ConnectFourBoard from './ConnectFourBoard'

export const ConnectFourIndex = (props) => (
  <div>
    <ConnectFourControls
      fetchNewBoard={props.fetchNewBoard}
      startGame={props.startGame}
      currentPlayer={props.currentPlayer}
    />
    <ConnectFourBoard
      isBoardActive={props.isBoardActive}
      board={props.board}
      playTurn={props.playTurn}
    />
  </div>
)

ConnectFourIndex.propTypes = {
  board: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.number
    )
  ),
  isBoardActive: React.PropTypes.bool,
  startGame: React.PropTypes.func,
  fetchNewBoard: React.PropTypes.func,
  currentPlayer: React.PropTypes.number,
  playTurn: React.PropTypes.func
}

export default ConnectFourIndex
