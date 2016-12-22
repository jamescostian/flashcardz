const {hardnessAscending, makeDescending} = require('./sort.js')
const convert = require('../convert')

module.exports = (stack, count, key, reverse) => {
  if (typeof reverse === 'undefined') {
    reverse = false // By default, just sort easiest to hardest and do not reverse the order
  // But if reverse is set to true, the order will be reversed (thus this function will be for getting the hardest card)
  }

  // Calling this function with (stack, key) should be the same as calling it with (stack, 1, key)
  if (typeof count === 'string') {
    key = count
    count = 1
  }
  // count should be optional, and default to 1
  if (typeof count === 'undefined') {
    count = 1
  }
  // key should default to all of the keys
  if (typeof key === 'undefined') {
    key = 'all'
  }

  // sorted has all of the cards sorted easiest to hardest
  let sorted
  if (reverse) {
    sorted = convert(stack, 'nice').sort(makeDescending(hardnessAscending))
  } else {
    sorted = convert(stack, 'nice').sort(hardnessAscending)
  }

  if (count === 1) {
    if (key === 'all') {
      return sorted[0]
    } else {
      return sorted[0][key]
    }
  }

  // Only keep the number of cards specified by count in limited
  const limited = sorted.slice(0, count)
  if (key === 'all') {
    return limited
  } else {
    return limited.map(card => card[key])
  }
}
