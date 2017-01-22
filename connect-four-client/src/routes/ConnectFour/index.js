import { injectReducer } from '../../store/reducers'
import { fetchBoard } from './modules/connectFour'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ConnectFour = require('./containers/ConnectFourContainer').default
      const reducer = require('./modules/connectFour').default

      /*  Add the reducer to the store on key 'connectFour'  */
      injectReducer(store, { key: 'connectFour', reducer })

      // fetchBoard so board is prepopulated
      store.dispatch(fetchBoard())

      /*  Return getComponent   */
      cb(null, ConnectFour)

    /* Webpack named bundle   */
    }, 'connectFour')
  }
})
