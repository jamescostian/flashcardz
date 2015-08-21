var util = require('util')
module.exports = function (card, id) {
  if (typeof id !== 'undefined') {
    return module.exports(card[id])
  }
  if (util.isArray(card)) {
    // Put each card through this function and reduce to a sum of right and wrong
    return card.map(function (card) {
      return module.exports(card)
    }).reduce(function (a, b) {
      return {
        right: a.right + b.right,
        wrong: a.wrong + b.wrong
      }
    }, {right: 0, wrong: 0})
  }
  var wrong = 0
  var right = 0
  card.history.forEach(function (event) {
    if (event.recalled) {
      right += 1
    } else {
      wrong += 1
    }
  })
  return {
    right: right,
    wrong: wrong
  }
}
