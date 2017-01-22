import React from 'react'

import ConnectFourBoard from './ConnectFourBoard'

export const ConnectFourIndex = (props) => (
  <div>
    <ConnectFourBoard />
  </div>
)

ConnectFourIndex.propTypes = {
  board     : React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.number
    )
  )
}

export default ConnectFourIndex
