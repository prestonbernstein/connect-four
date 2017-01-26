import {
  CONNECT_FOUR_START_GAME,
  CONNECT_FOUR_END_GAME,
  CONNECT_FOUR_UPDATE_BOARD,
  CONNECT_FOUR_RESET_BOARD,
  CONNECT_FOUR_CHANGE_CURRENT_PLAYER
} from 'routes/ConnectFour/modules/connectFour'

describe('(Redux Module) ConnectFour', () => {
  it('Should export a constant CONNECT_FOUR_START_GAME.', () => {
    expect(CONNECT_FOUR_START_GAME).to.equal('CONNECT_FOUR_START_GAME')
  })
})

describe('(Redux Module) ConnectFour', () => {
  it('Should export a constant CONNECT_FOUR_END_GAME.', () => {
    expect(CONNECT_FOUR_END_GAME).to.equal('CONNECT_FOUR_END_GAME')
  })
})

describe('(Redux Module) ConnectFour', () => {
  it('Should export a constant CONNECT_FOUR_UPDATE_BOARD.', () => {
    expect(CONNECT_FOUR_UPDATE_BOARD).to.equal('CONNECT_FOUR_UPDATE_BOARD')
  })
})

describe('(Redux Module) ConnectFour', () => {
  it('Should export a constant CONNECT_FOUR_RESET_BOARD.', () => {
    expect(CONNECT_FOUR_RESET_BOARD).to.equal('CONNECT_FOUR_RESET_BOARD')
  })
})

describe('(Redux Module) ConnectFour', () => {
  it('Should export a constant CONNECT_FOUR_CHANGE_CURRENT_PLAYER.', () => {
    expect(CONNECT_FOUR_CHANGE_CURRENT_PLAYER).to.equal('CONNECT_FOUR_CHANGE_CURRENT_PLAYER')
  })
})
