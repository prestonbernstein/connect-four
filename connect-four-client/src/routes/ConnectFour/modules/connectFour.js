// ------------------------------------
// Mock Data
// ------------------------------------
import BOARD_MOCK_DATA from '../../../../data/BOARD_MOCK_DATA.json'

// ------------------------------------
// Utils
// ------------------------------------
import {
  calculateCurrentPlayer,
  calculateBoardUpdate
} from '../utils'

// ------------------------------------
// Constants
// ------------------------------------
export const CONNECT_FOUR_REQUEST_NEW_BOARD = 'CONNECT_FOUR_REQUEST_NEW_BOARD'
export const CONNECT_FOUR_RECEIVE_NEW_BOARD = 'CONNECT_FOUR_RECEIVE_NEW_BOARD'
export const CONNECT_FOUR_START_GAME = 'CONNECT_FOUR_START_GAME'
export const CONNECT_FOUR_UPDATE_BOARD = 'CONNECT_FOUR_UPDATE_BOARD'
export const CONNECT_FOUR_CHANGE_CURRENT_PLAYER = 'CONNECT_FOUR_CHANGE_CURRENT_PLAYER'

// ------------------------------------
// Actions
// ------------------------------------
export function requestNewBoard () {
  return {
    type: CONNECT_FOUR_REQUEST_NEW_BOARD
  }
}

export function receiveNewBoard (value) {
  return {
    type: CONNECT_FOUR_RECEIVE_NEW_BOARD,
    payload: value
  }
}

export function startGame () {
  return {
    type: CONNECT_FOUR_START_GAME
  }
}

export function updateBoard (x, y) {
  return {
    type: CONNECT_FOUR_UPDATE_BOARD,
    payload: {
      x: x,
      y: y
    }
  }
}

export function changeCurrentPlayer () {
  return {
    type: CONNECT_FOUR_CHANGE_CURRENT_PLAYER
  }
}

// export const fetchBoard = () => {
//   return (dispatch) => {
//     dispatch(requestBoard())
//
//      TODO: if fetchBoard cannot find existing board, return new board
//
//     return dispatch(receiveNewBoard(BOARD_MOCK_DATA.board))
//   }
// }

export const fetchNewBoard = () => {
  return (dispatch) => {
    dispatch(requestNewBoard())

    return dispatch(receiveNewBoard(BOARD_MOCK_DATA.board))
  }
}

export const playTurn = (x, y) => {
  return (dispatch) => {
    dispatch(updateBoard(x, y))

    return dispatch(changeCurrentPlayer())
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CONNECT_FOUR_REQUEST_NEW_BOARD]: (state) => {
    return ({
      ...state,
      fetchingBoard: true
    })
  },
  [CONNECT_FOUR_RECEIVE_NEW_BOARD]: (state, action) => {
    return ({
      ...state,
      board: action.payload,
      isBoardActive: false,
      currentPlayer: 0,
      fetchingBoard: false
    })
  },
  [CONNECT_FOUR_START_GAME]: (state) => {
    return ({
      ...state,
      isBoardActive: true,
      currentPlayer: 1
    })
  },
  [CONNECT_FOUR_UPDATE_BOARD]: (state, action) => {
    const x = action.payload.x
    // const y = action.payload.y
    const board = calculateBoardUpdate(state.board, x, state.currentPlayer)
    return ({
      ...state,
      board: board
    })
  },
  [CONNECT_FOUR_CHANGE_CURRENT_PLAYER]: (state) => {
    return ({
      ...state,
      currentPlayer: calculateCurrentPlayer(state.currentPlayer)
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetchingBoard: false,
  board: [],
  isBoardActive: false,
  currentPlayer: 0
}

export default function connectFourReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
