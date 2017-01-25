// ------------------------------------
// Mock Data
// ------------------------------------
import BOARD_MOCK_DATA from '../../../../data/BOARD_MOCK_DATA.json'

// ------------------------------------
// Utils
// ------------------------------------
import {
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
export const CONNECT_FOUR_RESET_BOARD = 'CONNECT_FOUR_RESET_BOARD'
export const CONNECT_FOUR_CHANGE_CURRENT_PLAYER = 'CONNECT_FOUR_CHANGE_CURRENT_PLAYER'
export const CONNECT_FOUR_CHANGE_DIFFICULTY = 'CONNECT_FOUR_CHANGE_DIFFICULTY'

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

function resetBoard () {
  return {
    type: CONNECT_FOUR_RESET_BOARD
  }
}

export function changeCurrentPlayer () {
  return {
    type: CONNECT_FOUR_CHANGE_CURRENT_PLAYER
  }
}

export function changeDifficulty () {
  return {
    type: CONNECT_FOUR_CHANGE_DIFFICULTY
  }
}

export function restartGame () {
  return (dispatch) => {
    return Promise.all([
      dispatch(endGame()),
      dispatch(resetBoard())
    ])
  }
}

export const fetchNewBoard = () => {
  return (dispatch) => {
    // change this from promise because this will have fetch
    return Promise.all([
      dispatch(requestNewBoard()),
      dispatch(receiveNewBoard(BOARD_MOCK_DATA.board))
    ])
  }
}

export const playTurn = (x, y) => {
  return (dispatch) => {
    return Promise.all([
      dispatch(updateBoard(x, y)),
      dispatch(checkIfWinner())
    ])
  }
}

const checkIfWinner = () => {
  return (dispatch, getState) => {
    const { lastMove, board, currentPlayer } = getState().connectFour

    // returns true if won
    if (calculateIfGameWon(lastMove, board, currentPlayer) === true) {
      return Promise.resolve(
        dispatch(endGame()))
    }

    return Promise.all([
      dispatch(changeCurrentPlayer()),
      dispatch(makeAIMoveIfPlayerTwo())
    ])
  }
}

const makeAIMoveIfPlayerTwo = () => {
  return (dispatch, getState) => {
    const {
      currentPlayer,
      previousPlayer,
      lastMove,
      board,
      isHardMode
    } = getState().connectFour

    if (currentPlayer === 1) {
      return Promise.resolve()
    }

    return Promise.resolve(dispatch(getAIMove(lastMove, board, previousPlayer, currentPlayer, isHardMode)))
  }
}

const getAIMove = (lastMove, board, previousPlayer, currentPlayer, isHardMode) => {
  return (dispatch) => {
    const AIMove = calculateAIMove(lastMove, board, previousPlayer, currentPlayer, isHardMode)
    const { x, y } = AIMove

    return Promise.resolve(dispatch(playTurn(x, y)))
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
      isGameOver: false,
      currentPlayer: 1,
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ]
    })
  },
  [CONNECT_FOUR_END_GAME]: (state) => {
    return ({
      ...state,
      isGameOver: true,
      isBoardActive: false,
      currentPlayer: 0,
      previousPlayer: 0
    })
  },
  [CONNECT_FOUR_UPDATE_BOARD]: (state, action) => {
    const x = action.payload.x
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
  [CONNECT_FOUR_RESET_BOARD]: (state, action) => {
    console.log(savedInitialState)
    return ({
      ...state,
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ]
    })
  },
  [CONNECT_FOUR_CHANGE_CURRENT_PLAYER]: (state) => {
    return ({
      ...state,
      previousPlayer: state.currentPlayer, // set currentPlayer to previousPlayer
      currentPlayer: state.currentPlayer === 1 ? 2 : 1
    })
  },
  [CONNECT_FOUR_CHANGE_DIFFICULTY]: (state) => {
    return ({
      ...state,
      isHardMode: !state.isHardMode
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetchingBoard: false,
  board: [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ],
  lastMove: [],
  isBoardActive: false,
  isGameOver: true,
  isHardMode: false,
  currentPlayer: 0
}

const savedInitialState = initialState

export default function connectFourReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
