const addHistoryEvent = require('./add-history-event.js')
module.exports = (stack, id) => {
  if (Array.isArray(stack)) {
    return addHistoryEvent(stack, id, false)
  } else {
    return addHistoryEvent(stack, false)
  }
}
