const rightWrong = require('./right-wrong.js')

// Since everything here is for sorting in ascending order, this function allows you to transform them into ascending order sorting algorithms
module.exports.makeDescending = (func) => {
  return (a, b) => {
    const ascending = func(a, b)
    if (ascending === 0) {
      return 0
    } else {
      return -ascending // reverses the order
    }
  }
}

// Sorts cards based on their hardness in ascending order (easiest to hardest)
module.exports.hardnessAscending = (cardA, cardB) => {
  const rwA = rightWrong(cardA)
  const rwB = rightWrong(cardB)
  if (rwA.wrong + rwA.right < 1 && rwB.wrong + rwB.right < 1) {
    // Neither card has ever been seen!
    return 0
  } else if (rwA.wrong + rwA.right < 1) {
    // rwA has never been seen, so it's harder
    return 1
  } else if (rwB.wrong + rwB.right < 1) {
    // rwB has never been seen, so it's harder
    return -1
  } else {
    // Both cards have been seen
    const hardnessA = rwA.wrong / (rwA.wrong + rwA.right)
    const hardnessB = rwB.wrong / (rwB.wrong + rwB.right)
    return hardnessA - hardnessB
  }
}

// Sorts cards based on how many times they were missed in ascending order (least missed to most missed)
module.exports.missesAscending = (cardA, cardB) => rightWrong(cardA).wrong - rightWrong(cardB).wrong

// Sorts cards based on how many times they were not missed in ascending order (least time correct to most times correct)
module.exports.hitsAscending = (cardA, cardB) => rightWrong(cardA).right - rightWrong(cardB).right

// Sorts cards based on number of times attempted in ascending order (fewest times attempted to most times attempted)
module.exports.timesSeenAscending = (cardA, cardB) => {
  const attemptsA = rightWrong(cardA).wrong + rightWrong(cardA).right
  const attemptsB = rightWrong(cardB).wrong + rightWrong(cardB).right
  return attemptsA - attemptsB
}
