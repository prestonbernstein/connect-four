// ------------------------------------
// Mock Data
// ------------------------------------
import BOARD_MOCK_DATA from '../../../../data/BOARD_MOCK_DATA.json'

// ------------------------------------
// Constants
// ------------------------------------
export const CONNECT_FOUR_REQUEST_BOARD = 'CONNECT_FOUR_REQUEST_BOARD'
export const CONNECT_FOUR_RECEIVE_BOARD = 'CONNECT_FOUR_RECEIVE_BOARD'

// ------------------------------------
// Actions
// ------------------------------------
export function requestBoard () {
  return {
    type: CONNECT_FOUR_REQUEST_BOARD
  }
}

export function receiveBoard (value) {
  return {
    type: CONNECT_FOUR_RECEIVE_BOARD,
    payload: value
  }
}

export const fetchBoard = () => {
  return (dispatch) => {
    dispatch(requestBoard())

    return dispatch(receiveBoard(BOARD_MOCK_DATA.board))
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CONNECT_FOUR_REQUEST_BOARD]: (state) => {
    return ({
      ...state,
      fetchingBoard: true
    })
  },
  [CONNECT_FOUR_RECEIVE_BOARD]: (state, action) => {
    return ({
      ...state,
      board: action.payload,
      fetchingBoard: false
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetchingBoard: false,
  board: []
}

export default function connectFourReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
