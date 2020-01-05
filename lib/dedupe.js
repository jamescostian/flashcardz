module.exports = stack => {
  // seen is an array that contains all of the cards that have been seen at least once by the loop
  const seen = []
  // Filter out duplicates
  return stack.filter(card => {
    if (isDuplicate(card, seen)) {
      // The card is a duplicate, filter it out
      return false
    } else {
      // The card is not a duplicate, so add it to the list of cards that have been seen and keep it
      seen.push(card)
      return true
    }
  })
}

const isDuplicate = (thing, allThings) => {
  // Loop through allThings
  for (const possibleDuplicate of allThings) {
    // If the front of this possibleDuplicate matches the front of thing, and the same applies to the back, this is a duplicate!
    if (possibleDuplicate.front === thing.front && possibleDuplicate.back === thing.back) {
      return true
    }
  }
  return false
}
