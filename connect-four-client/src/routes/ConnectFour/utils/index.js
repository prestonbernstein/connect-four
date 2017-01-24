export const calculateCurrentPlayer = (previousPlayer) => {
  // change player based on number assigned to them
  let nextPlayer = previousPlayer === 1 ? 2 : 1
  return nextPlayer
}

export const calculateBoardUpdate = (board, x, currentPlayer) => {
  const updatedPieceYPosition = calculateNewPieceYPosition(board, x)
  let lastMove = []
  board[updatedPieceYPosition][x] = currentPlayer
  lastMove = { x: x, y: updatedPieceYPosition }
  return { board: board, lastMove: lastMove }
}

const calculateNewPieceYPosition = (board, x) => {
  // iterate through each row to search for first row with pieces currently in it, then set  n
  let y = 5
  for (let i = 0; i < board.length; i++) {
    if (board[i][x] !== 0) {
      y = i - 1
      break
    }
  }

  return y
}

export const calculateIfGameWon = () => {
  console.log('calculate if game won')
  let isGameWon = false
  return isGameWon
}

export const calculateAIMove = (lastMove) => {
  console.log('calculate AI Move')
  return lastMove
}
