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

export const calculateAIMove = (lastMove, board, currentPlayer) => {
  const { x, y } = lastMove

  // return suggested move based on player one's last move

  // return horizontal move if available
  const suggestedHorizontalMove = AIHorizontalMove(x, y, board, currentPlayer)
  if (suggestedHorizontalMove !== 'nope') {
    return suggestedHorizontalMove
  }

  return lastMove
}

// returns true or false
const calculateIfWonVertically = (x, y, board, currentPlayer) => {
  const verticalCount = calculateVertically(x, y, board, currentPlayer)

  if (verticalCount === 4) { // four are connected vertically
    return true // win
  }

  return false // keep playing
}

// returns true or false
const calculateIfWonHorizontally = (x, y, board, currentPlayer) => {
  const horizontalCount = calculateHorizontally(x, y, board, currentPlayer)
  const totalHorizontalCount = horizontalCount.totalCount

  if (totalHorizontalCount >= 4) { // four or more are connected horizontally
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
    if (y > 5) {
      break
    } else if (board[y][i] === currentPlayer) {
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

const calculateVertically = (x, y, board, currentPlayer) => {
  let count = 1

  // check below value and count to see if matching current piece laid
  for (let i = y + 1; i < board.length; i++) {
    if (board[i][x] === currentPlayer) {
      count++
    } else {
      break // exit if not contiguous
    }
  }

  return count
}

const calculateHorizontally = (x, y, board, currentPlayer) => {
  // check left of value and count to see if matching current piece laid
  let totalCount = 1
  let leftCount = 0
  let rightCount = 0

  // check left
  for (let i = x - 1; i >= 0; i--) {
    if (board[y][i] === currentPlayer) {
      leftCount++
    } else {
      break // exit if not contiguous
    }
  }

  // check right
  for (let i = x + 1; i <= board[y].length; i++) {
    if (board[y][i] === currentPlayer) {
      rightCount++
    } else {
      break // exit if not contiguous
    }
  }

  totalCount = totalCount + leftCount + rightCount
  console.log(totalCount)

  return {
    totalCount: totalCount,
    leftCount: leftCount,
    rightCount: rightCount
  }
}

const AIHorizontalMove = (x, y, board, previousPlayer) => {
  const previousPlayerHorizontalCount = calculateHorizontally(x, y, board, previousPlayer)
  const {
    totalCount,
    leftCount,
    rightCount
  } = previousPlayerHorizontalCount

  const proposedNewXLocationLeft = x - (leftCount - 1) // set proposed new location left of contiguous pieces
  const proposedNewXLocationRight = x + (rightCount + 1) // set proposed new location left of contiguous pieces

  // calculate space to left
  if (
    totalCount === 2 && // if previousPlayer has two horizontal pieces laid contiguously
    proposedNewXLocationLeft !== x && // if proposedNewXLocationLeft is not same as current x location
    proposedNewXLocationLeft >= 0 &&  // if x location just before previousPlayer's pieces is on board
    board[y][proposedNewXLocationLeft] === 0 // if new x location is empty
  ) {
    return { x:proposedNewXLocationLeft, y:y } // return new suggested move
  }

  // calculate space to right
  if (
    totalCount === 2 && // if previousPlayer has two horizontal pieces laid contiguously
    proposedNewXLocationRight <= 6 && // if x location just after previousPlayer's pieces is on board
    board[y][proposedNewXLocationRight] === 0 // if new x location is empty
  ) {
    return { x: proposedNewXLocationRight, y:y } // return new suggested move
  }

  return { x:x, y:y }
}
