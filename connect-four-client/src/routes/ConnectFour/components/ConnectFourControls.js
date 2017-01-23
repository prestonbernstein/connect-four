import React from 'react'
import classNames from 'classnames'

export const ConnectFourControls = (props) => {
  let currentTurnClasses = classNames({
    'circle-mini': true,
    'connect-four-current-turn-circle': true,
    'player-one': (props.currentPlayer === 1),
    'player-two': (props.currentPlayer === 2)
  })

  return (
    <div
      id='ConnectFourControls'
      className='row'
    >
      <div className='pull-left'>
        <div className='connect-four-current-turn-label'><h3>Player {props.currentPlayer}'s turn:</h3></div>
        <div className={currentTurnClasses} />
      </div>
      <div className='btn-group pull-right'>
        <button
          type='button'
          id='ConnectFourButtonStartGame'
          className='btn btn-primary'
          onClick={props.startGame}
        >
          Start This Game
        </button>
        <button
          type='button'
          id='ConnectFourButtonResetGame'
          className='btn btn-danger'
          onClick={props.fetchNewBoard}
        >
          Reset Game Board
        </button>
      </div>
    </div>
  )
}

ConnectFourControls.propTypes = {
  startGame: React.PropTypes.func,
  fetchNewBoard: React.PropTypes.func,
  isBoardActive: React.PropTypes.bool,
  currentPlayer: React.PropTypes.number
}

export default ConnectFourControls
