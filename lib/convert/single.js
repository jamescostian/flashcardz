var copy = require('../copy.js')
module.exports = function (card) {
  var newCard = copy(card)
  // Put in defaults in case things don't exist
  if (typeof newCard.front === 'undefined') {
    newCard.front = 'unspecified'
  }
  if (typeof newCard.back === 'undefined') {
    newCard.back = 'unspecified'
  }
  if (typeof newCard.history === 'undefined') {
    newCard.history = []
  }

  // If there are times stored as strings or integers, replace them with actual Date objects
  newCard.history = newCard.history.map(function (part) {
    /* istanbul ignore else */
    if (typeof part.time === 'string') {
      part.time = new Date(part.time)
    } else if (typeof part.time === 'number') {
      var newD = new Date()
      newD.setTime(part.time)
      part.time = newD
    }
    return part
  })

  return newCard
}
