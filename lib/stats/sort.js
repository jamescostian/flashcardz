var rightWrong = require('./right-wrong.js')

// Sorts cards based on their hardness in ascending order (easiest to hardest)
module.exports.hardnessAscending = function (cardA, cardB) {
  var rwA = rightWrong(cardA)
  var rwB = rightWrong(cardB)
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
    var hardnessA = rwA.wrong / (rwA.wrong + rwA.right)
    var hardnessB = rwB.wrong / (rwB.wrong + rwB.right)
    return hardnessA - hardnessB
  }
}

// Sorts cards based on how many times they were missed in ascending order (least missed to most missed)
module.exports.missesAscending = function (cardA, cardB) {
  return rightWrong(cardA).wrong - rightWrong(cardB).wrong
}

// Sorts cards based on how many times they were not missed in ascending order (least time correct to most times correct)
module.exports.hitsAscending = function (cardA, cardB) {
  return rightWrong(cardA).right - rightWrong(cardB).right
}

// Sorts cards based on number of times attempted in ascending order (fewest times attempted to most times attempted)
module.exports.timesSeenAscending = function (cardA, cardB) {
  var attemptsA = rightWrong(cardA).wrong + rightWrong(cardA).right
  var attemptsB = rightWrong(cardB).wrong + rightWrong(cardB).right
  return attemptsA - attemptsB
}
