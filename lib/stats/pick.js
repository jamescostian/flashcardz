var sorters = require('./sort.js')
var convert = require('../convert')
var numberIt = require('./number-it.js')

module.exports = {}

module.exports.random = module.exports.shuffle = function (stack) {
  return Math.floor(Math.random() * stack.length)
}
module.exports.even = function (stack) {
  var card = convert(stack, 'nice').map(numberIt).sort(sorters.timesSeenAscending)[0]
  return card.num
}
module.exports.easy = function (stack) {
  var card = convert(stack, 'nice').map(numberIt).sort(sorters.hardnessAscending)[0]
  return card.num
}
module.exports.hard = function (stack) {
  var card = convert(stack, 'nice').map(numberIt).sort(sorters.hardnessAscending)
  card = card.reverse()[0]
  return card.num
}

// A smart sorter which works based on acceptance
/* istanbul ignore next */
module.exports.smart = function (options) {
  if (typeof options === 'undefined') {
    options = {}
  }
  var acceptance = options.acceptance || 2
  return function (stack) {
    if (stack.length === 0) {
      return -1
    } else if (stack.length === 1) {
      return 0
    }
    var timesSeenDescending = stack.sort(sorters.timesSeenAscending).reverse()
    var mostSeenCard = timesSeenDescending[0]
    var mostTimesSeen = mostSeenCard.history.length
    // ratingDescending's first card is the one that the user needs the most work on, and the last card is the one the user knows the best
    var ratingDescending = convert(stack, 'nice')
      .map(function (card) {
        var timesSeen = card.history.length
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

        for (var i = 1; i <= acceptance; i += 1) {
          if (timesSeen >= i) {
            var event = card.history[timesSeen - i]
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

        var minutesSinceLastSeen = (Date.now() - card.history[timesSeen - 1].time.getTime()) / 60000
        if (minutesSinceLastSeen < 1) {
          card.rating -= Math.ceil(60 - 60 * minutesSinceLastSeen)
        } else {
          card.rating += Math.pow(1.01, Math.min(minutesSinceLastSeen, 300))
        }

        return card
      }).map(numberIt).sort(function (a, b) {
      return a.rating - b.rating
    }).reverse()

    // About every other time, throw up the second highest rated card
    if (Math.random() >= 0.5) {
      return ratingDescending[1].num
    } else {
      return ratingDescending[0].num
    }
  }
}
