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
  let count = 1
  let tempY = y
  let i

  // check diagonally up and left
  if (y > 0) { // only run if not at top of board
    for ((i = x - 1); i >= 0; i--) {
      tempY--
      if ((tempY >= 0) && (board[tempY][i] === currentPlayer)) {
        count++
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
        count++
      } else {
        break // exit if not contiguous
      }
    }
  }

  if (count >= 4) {
    return true
  }

  return false
}

const calculateIfWonDiagonallyUpRightAndLeftDown = (x, y, board, currentPlayer) => {
  let count = 1
  let tempY = y
  let i

  // check diagonally up and right
  if (y > 0) { // only run if not at top of board
    for ((i = x + 1); i <= 6; i++) {
      tempY--
      if ((tempY >= 0) && (board[tempY][i] === currentPlayer)) {
        count++
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
        count++
      } else {
        break // exit if not contiguous
      }
    }
  }

  if (count >= 4) {
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
    // } else if (i > 0 && board[y][i - 1] === currentPlayer) {
      // need to find a way to add to count without messing up app
      console.log('need to fill in gap')
    } else {
      break // exit if not contiguous
    }
  }

  // check right
  for (let i = x + 1; i <= board[y].length; i++) {
    if (board[y][i] === currentPlayer) { // if contiguous match
      rightCount++
    // } else if (i < board[y].length && board[y][i + 1] === currentPlayer) {
      // need to find a way to add to the count here without messing up app
      console.log('need to fill in gap')
    } else {
      break // exit if not contiguous
    }
  }

  totalCount = totalCount + leftCount + rightCount

  return {
    totalCount: totalCount,
    leftCount: leftCount,
    rightCount: rightCount
  }
}

const AIVerticalMove = (x, y, board, previousPlayer) => {
  const previousPlayerVerticalCount = calculateVertically(x, y, board, previousPlayer)
  console.log('previousPlayerVerticalCount', previousPlayerVerticalCount)
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
