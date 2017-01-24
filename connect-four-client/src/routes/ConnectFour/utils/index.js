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

export const calculateIfGameWon = (lastMove, board, currentPlayer) => {
  const { x, y } = lastMove
  if (calculateIfWonVertically(x, y, board, currentPlayer) === true) {
    return true
  }
  if (calculateIfWonHorizontally(x, y, board, currentPlayer) === true) {
    return true
  }
  if (calculateIfWonDiagonallyUpLeftAndRightDown(x, y, board, currentPlayer) === true) {
    return true
  }
  if (calculateIfWonDiagonallyUpRightAndLeftDown(x, y, board, currentPlayer) === true) {
    return true
  }

  return false
}

export const calculateAIMove = (lastMove) => {
  console.log('calculate AI Move')
  return lastMove
}

// returns true or false
const calculateIfWonVertically = (x, y, board, currentPlayer) => {
  console.log('board', board[y][x])
  // check below value and count to see if matching current piece laid
  for (let i = y + 1; i < board.length; i++) {
    let count = 1
    if (board[i][x] === currentPlayer) {
      count++
    }

    if (count === 4) { // four are connected vertically
      return true // win
    }

    return false // keep playing
  }
}

// returns true or false
const calculateIfWonHorizontally = (x, y, board, currentPlayer) => {
  // check left of value and count to see if matching current piece laid
  let count = 1

  // check left
  for (let i = x - 1; i >= 0; i--) {
    if (board[y][i] === currentPlayer) {
      count++
    } else {
      break // exit if not contiguous
    }
  }

  // check right
  for (let i = x + 1; i <= board[y].length; i++) {
    if (board[y][i] === currentPlayer) {
      count++
    } else {
      break // exit if not contiguous
    }
  }

  if (count >= 4) { // four or more are connected horizontally
    return true // win
  }

  return false // keep playing
}

const calculateIfWonDiagonallyUpLeftAndRightDown = (x, y, board, currentPlayer) => {
  let count = 1

  // check diagonally up and left
  for (let i = x - 1; i >= 0; i--) {
    y--
    if (board[y][i] === currentPlayer) {
      count++
    } else {
      break // exit if not contiguous
    }
  }

  // check diagonally down and right
  for (let i = x + 1; i < board[y].length; i++) {
    y++
    if (board[y][i] === currentPlayer) {
      count++
    } else {
      break // exit if not contiguous
    }
  }

  if (count >= 4) {
    return true
  }

  return false
}

const calculateIfWonDiagonallyUpRightAndLeftDown = (x, y, board, currentPlayer) => {
  return false
}
