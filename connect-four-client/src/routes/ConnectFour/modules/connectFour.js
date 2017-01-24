// ------------------------------------
// Mock Data
// ------------------------------------
import BOARD_MOCK_DATA from '../../../../data/BOARD_MOCK_DATA.json'

// ------------------------------------
// Utils
// ------------------------------------
import {
  calculateCurrentPlayer,
  calculateBoardUpdate,
  calculateIfGameWon,
  calculateAIMove
} from '../utils'

// ------------------------------------
// Constants
// ------------------------------------
export const CONNECT_FOUR_REQUEST_NEW_BOARD = 'CONNECT_FOUR_REQUEST_NEW_BOARD'
export const CONNECT_FOUR_RECEIVE_NEW_BOARD = 'CONNECT_FOUR_RECEIVE_NEW_BOARD'
export const CONNECT_FOUR_START_GAME = 'CONNECT_FOUR_START_GAME'
export const CONNECT_FOUR_END_GAME = 'CONNECT_FOUR_END_GAME'
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

export function endGame () {
  return {
    type: CONNECT_FOUR_END_GAME
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

export const fetchNewBoard = () => {
  return (dispatch) => {
    dispatch(requestNewBoard())

    return dispatch(receiveNewBoard(BOARD_MOCK_DATA.board))
  }
}

export const playTurn = (x, y) => {
  return (dispatch) => {
    dispatch(updateBoard(x, y))
    dispatch(checkIfWinner())
    dispatch(changeCurrentPlayer())
    setTimeout(() => { // system moves too blazing fast to visually tell it's the computer's turn!
      dispatch(makeAIMoveIfPlayerTwo())
    }, 1000)
  }
}

const checkIfWinner = () => {
  return (dispatch, getState) => {
    const { lastMove } = getState().connectFour

    // returns true if won
    if (calculateIfGameWon(lastMove) === true) {
      dispatch(endGame())
    }

    return Promise.resolve()
  }
}

const makeAIMoveIfPlayerTwo = () => {
  return (dispatch, getState) => {
    const {
      currentPlayer,
      lastMove
    } = getState().connectFour

    if (currentPlayer === 1) {
      return Promise.resolve()
    }

    return dispatch(getAIMove(lastMove))
  }
}

const getAIMove = (lastMove) => {
  return (dispatch) => {
    const AIMove = calculateAIMove(lastMove)
    const { x, y } = AIMove

    return dispatch(playTurn(x, y))
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
  [CONNECT_FOUR_END_GAME]: (state) => {
    return ({
      ...state,
      isGameOver: true,
      isBoardActive: false
    })
  },
  [CONNECT_FOUR_UPDATE_BOARD]: (state, action) => {
    const x = action.payload.x
    // const y = action.payload.y
    const boardAndLastMove = calculateBoardUpdate(state.board, x, state.currentPlayer)
    const {
      board, // use lastMove to calculate AI move
      lastMove // if currently player one's turn then calculate move for AI
    } = boardAndLastMove

    return ({
      ...state,
      board: board,
      lastMove: lastMove
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
  lastMove: [],
  isBoardActive: false,
  isGameOver: false,
  currentPlayer: 0
}

export default function connectFourReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
