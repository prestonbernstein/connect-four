import React from 'react'
import classNames from 'classnames'

const ConnectFourWinner = (props) => (
  <div className='connect-four-current-turn-label'><h3>Player {props.winner} wins last game!</h3></div>
)

ConnectFourWinner.propTypes = {
  winner: React.PropTypes.number
}

const ConnectFourCurrentTurn = (props) => {
  let currentTurnClasses = classNames({
    'circle-mini': true,
    'connect-four-current-turn-circle': true,
    'player-one': (props.currentPlayer === 1),
    'player-two': (props.currentPlayer === 2)
  })

  const labelDisplay = props.currentPlayer === 0
    ? <div className='connect-four-current-turn-label'><h3>Start a game.</h3></div>
    : (
      <div>
        <div className='connect-four-current-turn-label'>
          {labelDisplay}
          <h3>Player {props.currentPlayer}'s turn:</h3>
        </div>
        <div className={currentTurnClasses} />
      </div>
    )

  return (
    <div className='pull-left'>
      {labelDisplay}
    </div>
  )
}

ConnectFourCurrentTurn.propTypes = {
  currentPlayer: React.PropTypes.number
}

export const ConnectFourControls = (props) => {
  let startButtonClasses = classNames({
    'btn': true,
    'btn-primary': true,
    'disabled': (props.isBoardActive)
  })

  let resetButtonClasses = classNames({
    'btn': true,
    'btn-danger': true,
    'disabled': (!props.isBoardActive)
  })

  return (
    <div
      id='ConnectFourControls'
      className='row'
    >
      <div className='pull-left row'>
        { props.isGameOver === true && props.winner !== 0
          ? <ConnectFourWinner
            winner={props.winner}
            />
          : <ConnectFourCurrentTurn
            currentPlayer={props.currentPlayer}
            />
        }
      </div>
      <div className='btn-group pull-right'>
        <button
          type='button'
          id='ConnectFourButtonStartGame'
          className={startButtonClasses}
          onClick={props.startGame}
        >
          Start Game
        </button>
        <button
          type='button'
          id='ConnectFourButtonResetGame'
          className={resetButtonClasses}
          onClick={props.restartGame}
        >
          Reset Game Board
        </button>
      </div>
    </div>
  )
}

ConnectFourControls.propTypes = {
  startGame: React.PropTypes.func,
  restartGame: React.PropTypes.func,
  isBoardActive: React.PropTypes.bool,
  isGameOver: React.PropTypes.bool,
  currentPlayer: React.PropTypes.number,
  winner: React.PropTypes.number
}

export default ConnectFourControls
