var convert = require('../convert')
var util = require('util')
module.exports = function (stack, id, recalled, time) {
	if (!util.isArray(stack)) {
		// The "stack" is actually just one single card
		return module.exports([stack], 0, id, recalled)[0]
	}
	else {
		var newStack = convert(stack, 'nice')
		newStack[id].history.push({
			recalled: recalled,
			time: time || new Date()
		})
	}
	return newStack
}
