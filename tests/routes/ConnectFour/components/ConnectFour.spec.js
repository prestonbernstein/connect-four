import React from 'react'
import { bindActionCreators } from 'redux'
import { ConnectFourIndex } from 'routes/ConnectFour/components/ConnectFourIndex'
import { shallow } from 'enzyme'

describe('(Component) ConnectFourIndex', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      isBoardActive: true,
      currentPlayer: 1,
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      ...bindActionCreators({
        startGame: (_spies.startGame = sinon.spy()),
        fetchNewBoard: (_spies.fetchNewBoard = sinon.spy()),
        playTurn: (_spies.playTurn = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<ConnectFourIndex {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })
})
