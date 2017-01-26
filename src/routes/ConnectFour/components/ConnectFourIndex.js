import React from 'react'
import '../assets/ConnectFour.scss'

import ConnectFourControls from './ConnectFourControls'
import ConnectFourBoard from './ConnectFourBoard'

export const ConnectFourIndex = (props) => (
  <div>
    <ConnectFourControls
      startGame={props.startGame}
      restartGame={props.restartGame}
      currentPlayer={props.currentPlayer}
      isBoardActive={props.isBoardActive}
      isGameOver={props.isGameOver}
      winner={props.winner}
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
  isGameOver: React.PropTypes.bool,
  startGame: React.PropTypes.func,
  restartGame: React.PropTypes.func,
  currentPlayer: React.PropTypes.number,
  playTurn: React.PropTypes.func,
  winner: React.PropTypes.number
}

export default ConnectFourIndex
