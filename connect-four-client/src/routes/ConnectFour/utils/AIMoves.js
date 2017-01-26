import {
  calculateVertically,
  calculateHorizontally,
  calculateDiagonallyUpLeftAndRightDown,
  calculateDiagonallyUpRightAndLeftDown
} from './boardCalculations'

export const AIVerticalMove = (x, y, board, player) => {
  const playerVerticalCount = calculateVertically(x, y, board, player)

  const proposedNewYLocation = y - 1

  if (
    playerVerticalCount > 2 &&
    y > 0
  ) {
    return { x, y: proposedNewYLocation }
  }

  return { x, y }
}

export const AIHorizontalMove = (x, y, board, player) => {
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
    return { x: proposedNewXLocationRight, y } // return new suggested move
  }

  return { x, y }
}

export const AIDiagonallyUpLeftAndRightDownMove = (x, y, board, player) => {
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

export const AIDiagonallyUpRightAndLeftDownMove = (x, y, board, player) => {
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
export const AIFirstAvailableLocationMove = (board) => {
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
