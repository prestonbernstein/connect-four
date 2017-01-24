export const calculateCurrentPlayer = (previousPlayer) => {
  // change player based on number assigned to them
  let nextPlayer = previousPlayer === 1 ? 2 : 1
  return nextPlayer
}

export const calculateBoardUpdate = (board, x, currentPlayer) => {
  // TODO: bug where if player one has piece at y location 0 then it errors out on player two's move
  const updatedPieceYPosition = calculateNewPieceYPosition(board, x)
  let lastMove = []
  board[updatedPieceYPosition][x] = currentPlayer
  lastMove = { x: x, y: updatedPieceYPosition }
  return { board: board, lastMove: lastMove }
}

const calculateNewPieceYPosition = (board, x) => {
  // iterate through each row to search for first row with pieces currently in it, then set
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
  const diagonallyUpLeftAndRightDownCount = calculateDiagonallyUpLeftAndRightDown(x, y, board, currentPlayer)
  const totalDiagonallyUpLeftAndRightDownCount = diagonallyUpLeftAndRightDownCount.totalCount

  if (totalDiagonallyUpLeftAndRightDownCount >= 4) { // four or more are connected
    return true // win
  }

  return false // keep playing
}

const calculateIfWonDiagonallyUpRightAndLeftDown = (x, y, board, currentPlayer) => {
  const diagonallyUpRightAndLeftDownCount = calculateDiagonallyUpRightAndLeftDown(x, y, board, currentPlayer)
  const totalDiagonallyUpRightAndLeftDownCount = diagonallyUpRightAndLeftDownCount.totalCount

  if (totalDiagonallyUpRightAndLeftDownCount >= 4) {
    return true
  }

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
    if (board[y][i] === currentPlayer) { // if contiguous match
      rightCount++
      console.log('need to fill in gap')
    } else {
      break // exit if not contiguous
    }
  }

  // TODO: Add condition that checks line for matching pieces only separated by one empty space
  // and make that condition activated when AI is on hard mode

  totalCount = totalCount + leftCount + rightCount

  return {
    totalCount: totalCount,
    leftCount: leftCount,
    rightCount: rightCount
  }
}

const calculateDiagonallyUpLeftAndRightDown = (x, y, board, currentPlayer) => {
  let totalCount = 1
  let leftUpCount = 0
  let rightDownCount = 0

  let tempY = y
  let i

  // check diagonally up and left
  if (y > 0) { // only run if not at top of board
    for ((i = x - 1); i >= 0; i--) {
      tempY--
      if ((tempY >= 0) && (board[tempY][i] === currentPlayer)) {
        leftUpCount++
      } else {
        break // exit if not contiguous
      }
    }
  }

  tempY = y // reset temp variable to run next for loops

  // check diagonally down and right
  if (x < 6 && y < 5) { // only run if not at rightmost edge of board
    for ((i = x + 1); i < board[y].length; i++) {
      tempY++
      if ((tempY <= 5) && (board[tempY][i] === currentPlayer)) {
        rightDownCount++
      } else {
        break // exit if not contiguous
      }
    }
  }

  totalCount = totalCount + leftUpCount + rightDownCount

  return {
    totalCount: totalCount,
    leftUpCount: leftUpCount,
    rightDownCount: rightDownCount
  }
}

const calculateDiagonallyUpRightAndLeftDown = (x, y, board, currentPlayer) => {
  let totalCount = 1
  let rightUpCount = 0
  let leftDownCount = 0

  let tempY = y
  let i

  // check diagonally up and right
  if (y > 0) { // only run if not at top of board
    for ((i = x + 1); i <= 6; i++) {
      tempY--
      if ((tempY >= 0) && (board[tempY][i] === currentPlayer)) {
        rightUpCount++
      } else {
        break // exit if not contiguous
      }
    }
  }

  tempY = y // reset temp variable to run next for loops

  // check diagonally down and left
  if (x > 0 && y < 5) { // only run if not at leftmost edge of board
    for ((i = x - 1); i >= 0; i--) {
      tempY++
      if ((tempY <= 5) && (board[tempY][i] === currentPlayer)) {
        leftDownCount++
      } else {
        break // exit if not contiguous
      }
    }
  }

  totalCount = totalCount + rightUpCount + leftDownCount

  return {
    totalCount: totalCount,
    rightUpCount: rightUpCount,
    leftDownCount: leftDownCount
  }
}

const AIVerticalMove = (x, y, board, previousPlayer) => {
  const previousPlayerVerticalCount = calculateVertically(x, y, board, previousPlayer)
  return { x:x, y:y }
}

const AIHorizontalMove = (x, y, board, previousPlayer) => {
  const previousPlayerHorizontalCount = calculateHorizontally(x, y, board, previousPlayer)
  const {
    totalCount,
    leftCount,
    rightCount
  } = previousPlayerHorizontalCount

  const proposedNewXLocationLeft = x - (leftCount + 1) // set proposed new location left of contiguous pieces
  const proposedNewXLocationRight = x + (rightCount + 1) // set proposed new location left of contiguous pieces

  // calculate space to left
  if (
    totalCount >= 2 && // if previousPlayer has two horizontal pieces laid contiguously
    proposedNewXLocationLeft !== x && // if proposedNewXLocationLeft is not same as current x location
    proposedNewXLocationLeft >= 0 &&  // if x location just before previousPlayer's pieces is on board
    board[y][proposedNewXLocationLeft] === 0 // if new x location is empty
  ) {
    return { x:proposedNewXLocationLeft, y:y } // return new suggested move
  }

  // calculate space to right
  if (
    totalCount >= 2 && // if previousPlayer has two horizontal pieces laid contiguously
    proposedNewXLocationRight <= 6 && // if x location just after previousPlayer's pieces is on board
    board[y][proposedNewXLocationRight] === 0 // if new x location is empty
  ) {
    return { x: proposedNewXLocationRight, y:y } // return new suggested move
  }

  return { x:x, y:y }
}

const AIDiagonallyUpLeftAndRightDownMove = (x, y, board, currentPlayer) => {
  return { x, y }
}

const AIDiagonallyUpRightAndLeftDownMove = (x, y, board, currentPlayer) => {
  return { x, y }
}
