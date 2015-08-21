var util = require('util')
var addHistoryEvent = require('./add-history-event.js')
module.exports = function (stack, id) {
  if (util.isArray(stack)) {
    return addHistoryEvent(stack, id, false)
  } else {
    return addHistoryEvent(stack, false)
  }
}
