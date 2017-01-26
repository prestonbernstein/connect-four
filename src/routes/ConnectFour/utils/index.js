import {
  calculateNewPieceYPosition,
  calculateVertically,
  calculateHorizontally,
  calculateDiagonallyUpLeftAndRightDown,
  calculateDiagonallyUpRightAndLeftDown
} from './boardCalculations'

import {
  AIVerticalMove,
  AIHorizontalMove,
  AIDiagonallyUpLeftAndRightDownMove,
  AIDiagonallyUpRightAndLeftDownMove,
  AIFirstAvailableLocationMove
} from './AIMoves'

// creates a 2D array with initial values
export const createBoard = (rows, cols, initialValue) => {
  let arr = []
  for (let i = 0; i < rows; ++i) {
    let columns = []
    for (let j = 0; j < cols; ++j) {
      columns[j] = initialValue
    }
    arr[i] = columns
  }
  return arr
}

export const calculateBoardUpdate = (board, x, currentPlayer, lastMovePlayer1, lastMovePlayer2) => {
  const updatedPieceYPosition = calculateNewPieceYPosition(board, x)
  board[updatedPieceYPosition][x] = currentPlayer
  const lastMove = { x, y: updatedPieceYPosition }

  if (currentPlayer === 1) {
    lastMovePlayer1 = lastMove
  } else if (currentPlayer === 2) {
    lastMovePlayer2 = lastMove
  }

  return { board, lastMovePlayer1, lastMovePlayer2 }
}

export const calculateIfGameWon = (lastMovePlayer1, lastMovePlayer2, board, currentPlayer) => {
  let lastMove
  if (currentPlayer === 1) {
    lastMove = lastMovePlayer1
  } else if (currentPlayer === 2) {
    lastMove = lastMovePlayer2
  }

  const { x, y } = lastMove

  let isGameWon = false

  switch (true) {
    case calculateVertically(x, y, board, currentPlayer) === 4:
      isGameWon = true
      break
    case calculateHorizontally(x, y, board, currentPlayer).totalCount >= 4:
      isGameWon = true
      break
    case calculateDiagonallyUpLeftAndRightDown(x, y, board, currentPlayer).totalCount >= 4:
      isGameWon = true
      break
    case calculateDiagonallyUpRightAndLeftDown(x, y, board, currentPlayer).totalCount >= 4:
      isGameWon = true
      break
    default:
      return
  }
  return isGameWon
}

export const calculateAIMove = (lastMovePlayer1, lastMovePlayer2, board, previousPlayer, currentPlayer) => {
  const opposingPlayerLastMove = currentPlayer === 1 ? lastMovePlayer2 : lastMovePlayer1
  const lastMove = currentPlayer === 1 ? lastMovePlayer1 : lastMovePlayer2

  // return suggested vertical move if available
  const suggestedDefensiveVerticalMove = AIVerticalMove(
    opposingPlayerLastMove.x,
    opposingPlayerLastMove.y,
    board,
    previousPlayer
  )
  if (suggestedDefensiveVerticalMove.y !== opposingPlayerLastMove.y) {
    return suggestedDefensiveVerticalMove
  }

  // return horizontal move if available
  const suggestedDefensiveHorizontalMove = AIHorizontalMove(
    opposingPlayerLastMove.x,
    opposingPlayerLastMove.y,
    board,
    previousPlayer
  )
  if (suggestedDefensiveHorizontalMove.x !== opposingPlayerLastMove.x) {
    return suggestedDefensiveHorizontalMove
  }

  // return diagonallyUpLeftAndRightDown move if available
  const suggestedDefensiveDiagonallyUpLeftAndRightDownMove = AIDiagonallyUpLeftAndRightDownMove(
    opposingPlayerLastMove.x,
    opposingPlayerLastMove.y,
    board,
    previousPlayer
  )
  if (
    suggestedDefensiveDiagonallyUpLeftAndRightDownMove.x !== opposingPlayerLastMove.x &&
    suggestedDefensiveDiagonallyUpLeftAndRightDownMove.y !== opposingPlayerLastMove.y
  ) {
    return suggestedDefensiveDiagonallyUpLeftAndRightDownMove
  }

  // return diagonallyUpRightAndLeftDown move if available
  const suggestedDefensiveDiagonallyUpRightAndLeftDownMove = AIDiagonallyUpRightAndLeftDownMove(
    opposingPlayerLastMove.x,
    opposingPlayerLastMove.y,
    board,
    previousPlayer
  )
  if (
    suggestedDefensiveDiagonallyUpRightAndLeftDownMove.x !== opposingPlayerLastMove.x &&
    suggestedDefensiveDiagonallyUpRightAndLeftDownMove.y !== opposingPlayerLastMove.y
  ) {
    return suggestedDefensiveDiagonallyUpRightAndLeftDownMove
  }

  // repeat above calculations with currentPlayer for offensive moves if lastMove exists yet
  if (typeof lastMove[0] !== 'undefined' && lastMove[0] !== null) {
    // return suggested vertical move if available
    const suggestedOffensiveVerticalMove = AIVerticalMove(lastMove.x, lastMove.y, board, currentPlayer)
    if (suggestedOffensiveVerticalMove.y !== lastMove.y) {
      return suggestedOffensiveVerticalMove
    }

    // return horizontal move if available
    const suggestedOffensiveHorizontalMove = AIHorizontalMove(lastMove.x, lastMove.y, board, currentPlayer)
    if (suggestedOffensiveHorizontalMove.x !== lastMove.x) {
      return suggestedOffensiveHorizontalMove
    }

    // return diagonallyUpLeftAndRightDown move if available
    const suggestedOffensiveDiagonallyUpLeftAndRightDownMove = AIDiagonallyUpLeftAndRightDownMove(
      lastMove.x,
      lastMove.y,
      board,
      currentPlayer
    )
    if (
      suggestedOffensiveDiagonallyUpLeftAndRightDownMove.x !== lastMove.x &&
      suggestedOffensiveDiagonallyUpLeftAndRightDownMove.y !== lastMove.y
    ) {
      return suggestedOffensiveDiagonallyUpLeftAndRightDownMove
    }

    // return diagonallyUpRightAndLeftDown move if available
    const suggestedOffensiveDiagonallyUpRightAndLeftDownMove = AIDiagonallyUpRightAndLeftDownMove(
      lastMove.x,
      lastMove.y,
      board,
      currentPlayer
    )
    if (
      suggestedOffensiveDiagonallyUpRightAndLeftDownMove.x !== lastMove.x &&
      suggestedOffensiveDiagonallyUpRightAndLeftDownMove.y !== lastMove.y
    ) {
      return suggestedOffensiveDiagonallyUpRightAndLeftDownMove
    }
  }

  const suggestedAIFirstAvailableLocationMove = AIFirstAvailableLocationMove(board)
  suggestedAIFirstAvailableLocationMove !== lastMove

  if (
    suggestedAIFirstAvailableLocationMove !== lastMove
  ) {
    return suggestedAIFirstAvailableLocationMove
  }

  return lastMove
}
