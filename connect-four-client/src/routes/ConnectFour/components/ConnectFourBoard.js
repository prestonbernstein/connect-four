import React from 'react'

import ConnectFourCell from './ConnectFourCell'

export const ConnectFourBoard = (props) => (
  <div
    id='ConnectFourBoard'
    className='connect-four-board row'
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
              />
          )}
        </ul>
    )}
  </div>
)

ConnectFourBoard.propTypes = {
  board: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.number
    )
  )
}

export default ConnectFourBoard
