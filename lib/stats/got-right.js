const addHistoryEvent = require('./add-history-event.js')
module.exports = (stack, id) => {
  if (Array.isArray(stack)) {
    return addHistoryEvent(stack, id, true)
  } else {
    return addHistoryEvent(stack, true)
  }
}
