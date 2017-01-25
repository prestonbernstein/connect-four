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

export const calculateBoardUpdate = (board, x, currentPlayer) => {
  const updatedPieceYPosition = calculateNewPieceYPosition(board, x)
  board[updatedPieceYPosition][x] = currentPlayer
  const lastMove = { x, y: updatedPieceYPosition }

  return { board, lastMove }
}

export const calculateIfGameWon = (lastMove, board, currentPlayer) => {
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

export const calculateAIMove = (lastMove, board, previousPlayer, currentPlayer, isHardMode) => {
  const { x, y } = lastMove

  // return suggested vertical move if available
  const suggestedDefensiveVerticalMove = AIVerticalMove(x, y, board, previousPlayer)
  if (suggestedDefensiveVerticalMove.y !== lastMove.y) {
    return suggestedDefensiveVerticalMove
  }

  // return horizontal move if available
  const suggestedDefensiveHorizontalMove = AIHorizontalMove(x, y, board, previousPlayer)
  if (suggestedDefensiveHorizontalMove.x !== lastMove.x) {
    return suggestedDefensiveHorizontalMove
  }

  // return diagonallyUpLeftAndRightDown move if available
  const suggestedDefensiveDiagonallyUpLeftAndRightDownMove = AIDiagonallyUpLeftAndRightDownMove(x, y, board, previousPlayer) // eslint-disable-line
  if (
    suggestedDefensiveDiagonallyUpLeftAndRightDownMove.x !== lastMove.x &&
    suggestedDefensiveDiagonallyUpLeftAndRightDownMove.y !== lastMove.y
  ) {
    return suggestedDefensiveDiagonallyUpLeftAndRightDownMove
  }

  // return diagonallyUpRightAndLeftDown move if available
  const suggestedDefensiveDiagonallyUpRightAndLeftDownMove = AIDiagonallyUpRightAndLeftDownMove(x, y, board, previousPlayer) // eslint-disable-line
  if (
    suggestedDefensiveDiagonallyUpRightAndLeftDownMove.x !== lastMove.x &&
    suggestedDefensiveDiagonallyUpRightAndLeftDownMove.y !== lastMove.y
  ) {
    return suggestedDefensiveDiagonallyUpRightAndLeftDownMove
  }

  // repeat above calculations with currentPlayer for offensive moves

  // return suggested vertical move if available
  const suggestedOffensiveVerticalMove = AIVerticalMove(x, y, board, currentPlayer)
  if (suggestedOffensiveVerticalMove.y !== lastMove.y) {
    return suggestedOffensiveVerticalMove
  }

  // return horizontal move if available
  const suggestedOffensiveHorizontalMove = AIHorizontalMove(x, y, board, currentPlayer)
  if (suggestedOffensiveHorizontalMove.x !== lastMove.x) {
    return suggestedOffensiveHorizontalMove
  }

  // return diagonallyUpLeftAndRightDown move if available
  const suggestedOffensiveDiagonallyUpLeftAndRightDownMove = AIDiagonallyUpLeftAndRightDownMove(x, y, board, currentPlayer) // eslint-disable-line
  if (
    suggestedOffensiveDiagonallyUpLeftAndRightDownMove.x !== lastMove.x &&
    suggestedOffensiveDiagonallyUpLeftAndRightDownMove.y !== lastMove.y
  ) {
    return suggestedOffensiveDiagonallyUpLeftAndRightDownMove
  }

  // return diagonallyUpRightAndLeftDown move if available
  const suggestedOffensiveDiagonallyUpRightAndLeftDownMove = AIDiagonallyUpRightAndLeftDownMove(x, y, board, currentPlayer) // eslint-disable-line
  if (
    suggestedOffensiveDiagonallyUpRightAndLeftDownMove.x !== lastMove.x &&
    suggestedOffensiveDiagonallyUpRightAndLeftDownMove.y !== lastMove.y
  ) {
    return suggestedOffensiveDiagonallyUpRightAndLeftDownMove
  }

  console.log('skipped')

  const suggestedAIFirstAvailableLocationMove = AIFirstAvailableLocationMove(board)
  suggestedAIFirstAvailableLocationMove !== lastMove

  if (
    suggestedAIFirstAvailableLocationMove !== lastMove
  ) {
    return suggestedAIFirstAvailableLocationMove
  }

  return lastMove
}
