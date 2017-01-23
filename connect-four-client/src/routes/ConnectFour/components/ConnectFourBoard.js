import React from 'react'
import classNames from 'classnames'

import ConnectFourCell from './ConnectFourCell'

export const ConnectFourBoard = (props) => {
  let boardClasses = classNames({
    'row': true,
    'connect-four-board': true,
    'disabled': (!props.isBoardActive)
  })

  return (
    <div
      id='ConnectFourBoard'
      className={boardClasses}
    >
      {
        props.board.map((row, y) =>
          <ul
            className='connect-four-row'
            key={y}
          >
            {
              row.map((cellStatus, x) =>
                <ConnectFourCell
                  key={x}
                  x={x}
                  y={y}
                  cellStatus={cellStatus}
                  playTurn={props.playTurn}
                />
            )}
          </ul>
      )}
    </div>
  )
}

ConnectFourBoard.propTypes = {
  board: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.number
    )
  ),
  isBoardActive: React.PropTypes.bool,
  playTurn: React.PropTypes.func
}

export default ConnectFourBoard
