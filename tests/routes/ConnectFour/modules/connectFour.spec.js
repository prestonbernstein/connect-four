import {
  CONNECT_FOUR_REQUEST_NEW_BOARD
} from 'routes/ConnectFour/modules/connectFour'

describe('(Redux Module) ConnectFour', () => {
  it('Should export a constant CONNECT_FOUR_REQUEST_NEW_BOARD.', () => {
    expect(CONNECT_FOUR_REQUEST_NEW_BOARD).to.equal('CONNECT_FOUR_REQUEST_NEW_BOARD')
  })
})
