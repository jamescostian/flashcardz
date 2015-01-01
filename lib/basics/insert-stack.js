var util = require('util')
var merge = require('deep-extend')

// Inserts a new stack of cards.
// If a stack already exists with the name you chose, this WILL THROW AN ERROR
module.exports = function (stackName, stack) {
	if (typeof this.stacks[stackName] !== 'undefined') {
		throw new Error('Flashcardz: a stack with the name "' + stackName + '" already exists! You can\'t insert a stack with the same name!')
	}
	// If stack isn't an array, convert it to an array
	if (!util.isArray(stack)) {
		var obj = stack
		var keys = Object.keys(obj)
		stack = keys.map(function (key) {
			return {
				front: key,
				back: obj[key]
			}
		})
	}

	// Merge each card with a blank card to ensure that there aren't any unset variables, and insert those cards into the new stack
	this.stacks[stackName] = stack.map(function (card) {
		return merge(
			{
				front: 'unspecified',
				back: 'unspecified',
				right: 0,
				wrong: 0
			}, card)
	})
}
