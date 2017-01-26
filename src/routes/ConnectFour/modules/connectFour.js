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
export const CONNECT_FOUR_START_GAME = 'CONNECT_FOUR_START_GAME'
export const CONNECT_FOUR_END_GAME = 'CONNECT_FOUR_END_GAME'
export const CONNECT_FOUR_UPDATE_BOARD = 'CONNECT_FOUR_UPDATE_BOARD'
export const CONNECT_FOUR_RESET_BOARD = 'CONNECT_FOUR_RESET_BOARD'
export const CONNECT_FOUR_CHANGE_CURRENT_PLAYER = 'CONNECT_FOUR_CHANGE_CURRENT_PLAYER'

// ------------------------------------
// Actions
// ------------------------------------
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

export function restartGame () {
  return (dispatch) => {
    return Promise.all([
      dispatch(endGame()),
      dispatch(resetBoard())
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
    const { lastMovePlayer1, lastMovePlayer2, board, currentPlayer } = getState().connectFour

    // returns true if won
    if (calculateIfGameWon(lastMovePlayer1, lastMovePlayer2, board, currentPlayer) === true) {
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
      lastMovePlayer1,
      lastMovePlayer2,
      board
    } = getState().connectFour

    if (currentPlayer === 1) {
      return Promise.resolve()
    }

    return Promise.resolve(dispatch(getAIMove(
      lastMovePlayer1,
      lastMovePlayer2,
      board,
      previousPlayer,
      currentPlayer
    )))
  }
}

const getAIMove = (lastMovePlayer1, lastMovePlayer2, board, previousPlayer, currentPlayer) => {
  return (dispatch) => {
    const AIMove = calculateAIMove(lastMovePlayer1, lastMovePlayer2, board, previousPlayer, currentPlayer)
    const { x, y } = AIMove

    return Promise.resolve(dispatch(playTurn(x, y)))
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
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
    const boardAndLastMove = calculateBoardUpdate(
      state.board,
      x,
      state.currentPlayer,
      state.lastMovePlayer1,
      state.lastMovePlayer2
    )
    const {
      board, // use lastMove to calculate AI move
      lastMovePlayer1,
      lastMovePlayer2
    } = boardAndLastMove

    return ({
      ...state,
      board: board,
      lastMovePlayer1: lastMovePlayer1,
      lastMovePlayer2: lastMovePlayer2
    })
  },
  [CONNECT_FOUR_RESET_BOARD]: (state, action) => {
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
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  board: [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ],
  lastMovePlayer1: [],
  lastMovePlayer2: [],
  isBoardActive: false,
  isGameOver: true,
  currentPlayer: 0
}

export default function connectFourReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
