import ConnectFourRoute from 'routes/ConnectFour'

describe('(Route) ConnectFour', () => {
  let _route

  beforeEach(() => {
    _route = ConnectFourRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })
})
