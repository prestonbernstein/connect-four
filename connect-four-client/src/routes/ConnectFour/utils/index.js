export const calculateCurrentPlayer = (previousPlayer) => {
  console.log(previousPlayer)
  // change player based on number assigned to them
  let nextPlayer = previousPlayer === 1 ? 2 : 1
  return nextPlayer
}
