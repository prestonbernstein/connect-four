import React from 'react'

export const ConnectFour = (props) => (
  <div style={{ margin: '0 auto' }} >
    <h2>ConnectFour: {props.connectFour}</h2>
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      Double (Async)
    </button>
  </div>
)

ConnectFour.propTypes = {
  connectFour     : React.PropTypes.number.isRequired,
  doubleAsync : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired
}

export default ConnectFour
