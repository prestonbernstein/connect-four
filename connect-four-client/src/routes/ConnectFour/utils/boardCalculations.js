export const calculateNewPieceYPosition = (board, x) => {
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

export const calculateVertically = (x, y, board, currentPlayer) => {
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

export const calculateHorizontally = (x, y, board, currentPlayer) => {
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

export const calculateDiagonallyUpLeftAndRightDown = (x, y, board, currentPlayer) => {
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

export const calculateDiagonallyUpRightAndLeftDown = (x, y, board, currentPlayer) => {
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
