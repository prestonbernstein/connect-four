export const calculateBoardUpdate = (board, x, currentPlayer) => {
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

const AIVerticalMove = (x, y, board, player) => {
  const playerVerticalCount = calculateVertically(x, y, board, player)

  const proposedNewYLocation = y - 1

  if (
    playerVerticalCount > 2 &&
    y > 0
  ) {
    return { x:x, y: proposedNewYLocation }
  }

  return { x:x, y:y }
}

const AIHorizontalMove = (x, y, board, player) => {
  const playerHorizontalCount = calculateHorizontally(x, y, board, player)
  const {
    totalCount,
    leftCount,
    rightCount
  } = playerHorizontalCount

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

const AIDiagonallyUpLeftAndRightDownMove = (x, y, board, player) => {
  const playerDiagonallyUpLeftAndRightDownMove = calculateDiagonallyUpLeftAndRightDown(x, y, board, player) // eslint-disable-line
  const {
    totalCount,
    leftUpCount,
    rightDownCount
  } = playerDiagonallyUpLeftAndRightDownMove

  // determine if should put piece left and up
  const proposedNewXLocationLeft = x - (leftUpCount + 1) // set proposed new location left of contiguous pieces
  const proposedNewYLocationUp = y + (leftUpCount + 1) // set proposed new location left of contiguous pieces
  if (
    totalCount >= 2 && // if previousPlayer has two or more pieces laid contiguously
    proposedNewXLocationLeft >= 0 && // if x location just after previousPlayer's pieces is on board
    proposedNewXLocationLeft <= 6 && // if x location just after previousPlayer's pieces is on board
    proposedNewYLocationUp >= 0 && // if y location just after previousPlayer's pieces is on board
    proposedNewYLocationUp <= 5 && // if y location just after previousPlayer's pieces is on board
    board[proposedNewYLocationUp][proposedNewXLocationLeft] === 0 // if new location is empty
  ) {
    return { x: proposedNewXLocationLeft, y: proposedNewYLocationUp }
  }

  // determine if should put piece right and down
  const proposedNewXLocationRight = x - (rightDownCount + 1) // set proposed new location left of contiguous pieces
  const proposedNewYLocationDown = y + (rightDownCount + 1) // set proposed new location left of contiguous pieces
  if (
    totalCount >= 2 && // if previousPlayer has two or more pieces laid contiguously
    proposedNewXLocationRight >= 0 && // if x location just after previousPlayer's pieces is on board
    proposedNewXLocationRight <= 6 && // if x location just after previousPlayer's pieces is on board
    proposedNewYLocationDown >= 0 && // if y location just after previousPlayer's pieces is on board
    proposedNewYLocationDown <= 5 && // if y location just after previousPlayer's pieces is on board
    board[proposedNewYLocationDown][proposedNewXLocationRight] === 0 // if new location is empty
  ) {
    return { x: proposedNewXLocationRight, y: proposedNewYLocationDown }
  }

  return { x, y }
}

const AIDiagonallyUpRightAndLeftDownMove = (x, y, board, player) => {
  const playerDiagonallyUpRightAndLeftDownMove = calculateDiagonallyUpRightAndLeftDown(x, y, board, player) // eslint-disable-line
  const {
    totalCount,
    rightUpCount,
    leftDownCount
  } = playerDiagonallyUpRightAndLeftDownMove

  // determine if should put piece right and up
  const proposedNewXLocationRight = x + (rightUpCount + 1) // set proposed new location left of contiguous pieces
  const proposedNewYLocationUp = y - (rightUpCount + 1) // set proposed new location left of contiguous pieces
  if (
    totalCount >= 2 && // if previousPlayer has two or more pieces laid contiguously
    proposedNewXLocationRight <= 6 && // if x location just after previousPlayer's pieces is on board
    proposedNewYLocationUp >= 0 && // if y location just after previousPlayer's pieces is on board
    board[proposedNewYLocationUp][proposedNewXLocationLeft] === 0 // if new location is empty
  ) {
    return { x: proposedNewXLocationLeft, y: proposedNewYLocationUp }
  }

  // determine if should put piece left and down
  const proposedNewXLocationLeft = x - (leftDownCount + 1) // set proposed new location left of contiguous pieces
  const proposedNewYLocationDown = y + (leftDownCount + 1) // set proposed new location left of contiguous pieces
  if (
    totalCount >= 2 && // if previousPlayer has two or more pieces laid contiguously
    proposedNewXLocationLeft >= 0 && // if x location just after previousPlayer's pieces is on board
    proposedNewYLocationDown <= 5 && // if y location just after previousPlayer's pieces is on board
    board[proposedNewYLocationDown][proposedNewXLocationLeft] === 0 // if new location is empty
  ) {
    return { x: proposedNewXLocationLeft, y: proposedNewYLocationDown }
  }

  return { x, y }
}

// look starting from bottom left to top right of board for an available location to move
const AIFirstAvailableLocationMove = (board) => {
  // iterate through each row from left to right to search for first row with available location, then set
  let x = 0
  let y = 5
  for (let i = y; i >= 0; i--) {
    if (board[i].indexOf(0) !== -1) {
      x = board[i].indexOf(0)
      y = i
      break
    }
  }

  return { x, y }
}
