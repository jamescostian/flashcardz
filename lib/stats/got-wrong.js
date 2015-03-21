var copy = require('../copy.js')
module.exports = function (stack, id) {
	var newStack = copy(stack)
	if (typeof id === 'undefined') {
		// stack is not a stack - it's just a card, so update the card's wrong key
		newStack.wrong += 1
	}
	else {
		newStack[id].wrong += 1
	}
	return newStack
}
