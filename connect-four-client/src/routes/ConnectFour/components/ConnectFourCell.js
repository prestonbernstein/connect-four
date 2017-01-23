import React from 'react'
import classNames from 'classnames'

export const ConnectFourCell = (props) => {
  let gamePieceClasses = classNames({
    'circle-cell': true,
    'player-one': (props.cellStatus === 1),
    'player-two': (props.cellStatus === 2)
  })

  return (
    <li className='connect-four-cell'>
      <div
        className={gamePieceClasses}
        onClick={() => props.playTurn(props.x, props.y)}
      />
    </li>
  )
}

ConnectFourCell.propTypes = {
  cellStatus: React.PropTypes.number,
  isBoardActive: React.PropTypes.bool,
  playTurn: React.PropTypes.func,
  x: React.PropTypes.number,
  y: React.PropTypes.number
}

export default ConnectFourCell
