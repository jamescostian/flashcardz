const sorters = require('./sort.js')
const convert = require('../convert')
const numberIt = require('./number-it.js')

module.exports = {}

module.exports.random = module.exports.shuffle = stack => Math.floor(Math.random() * stack.length)
module.exports.even = stack => {
  const card = convert(stack, 'nice').map(numberIt).sort(sorters.timesSeenAscending)[0]
  return card.num
}
module.exports.easy = stack => {
  const card = convert(stack, 'nice').map(numberIt).sort(sorters.hardnessAscending)[0]
  return card.num
}
module.exports.hard = stack => {
  const card = convert(stack, 'nice').map(numberIt).sort(sorters.makeDescending(sorters.hardnessAscending))[0]
  return card.num
}

// A smart sorter which works based on acceptance
/* istanbul ignore next */
module.exports.smart = options => {
  if (typeof options === 'undefined') {
    options = {}
  }
  const acceptance = options.acceptance || 2
  return stack => {
    if (stack.length === 0) {
      return -1
    } else if (stack.length === 1) {
      return 0
    }
    const timesSeenDescending = stack.sort(sorters.makeDescending(sorters.timesSeenAscending))
    const mostSeenCard = timesSeenDescending[0]
    const mostTimesSeen = mostSeenCard.history.length
    // ratingDescending's first card is the one that the user needs the most work on, and the last card is the one the user knows the best
    const ratingDescending = convert(stack, 'nice')
      .map(card => {
        const timesSeen = card.history.length
        if (mostTimesSeen > 0) {
          card.rating = 1 * (mostTimesSeen - timesSeen) / acceptance
        } else {
          card.rating = 0
        }
        // This card has never been seen! Try to get it to be seen at least once
        if (timesSeen === 0) {
          card.rating += 40
          return card
        }

        for (let i = 1; i <= acceptance; i += 1) {
          if (timesSeen >= i) {
            const event = card.history[timesSeen - i]
            if (!event.recalled) {
              // This card wasn't correctly recalled at one point in history, so make it show up more often
              card.rating += 50 * (acceptance - i + 1) / acceptance
            } else {
              // This card was correctly recalled - make it seen a little bit less
              card.rating -= 5 * (acceptance - i + 1) / acceptance
            }
          } else {
            // This card hasn't been seen (acceptance) times, so add a certain amount for every time it wasn't seen
            card.rating += 5 * (acceptance - i + 1) / acceptance
          }
        }

        const minutesSinceLastSeen = (Date.now() - card.history[timesSeen - 1].time.getTime()) / 60000
        if (minutesSinceLastSeen < 1) {
          card.rating -= Math.ceil(60 - 60 * minutesSinceLastSeen)
        } else {
          card.rating += Math.pow(1.01, Math.min(minutesSinceLastSeen, 300))
        }

        return card
      }).map(numberIt).sort((a, b) => b.rating - a.rating)

    // About every other time, throw up the second highest rated card
    if (Math.random() >= 0.5) {
      return ratingDescending[1].num
    } else {
      return ratingDescending[0].num
    }
  }
}
