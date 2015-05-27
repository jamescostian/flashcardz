var util = require('util')
var addHistoryEvent = require('./add-history-event.js')
module.exports = function (stack, id) {
	if (util.isArray(stack)) {
		return addHistoryEvent(stack, id, true)
	}
	else {
		return addHistoryEvent(stack, true)
	}
}
