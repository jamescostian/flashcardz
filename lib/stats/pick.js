var sorters = require('./sort.js')
var copy = require('../copy.js')

// Assign each element
var numberIt = function (obj, number) {
	obj.num = number
	return obj
}

module.exports = {}

module.exports.random = module.exports.shuffle = function (stack) {
	return Math.floor(Math.random() * stack.length)
}
module.exports.even = function (stack) {
	var card = copy(stack).map(numberIt).sort(sorters.timesSeenAscending)[0]
	return card.num
}
module.exports.easy = function (stack) {
	var card = copy(stack).map(numberIt).sort(sorters.hardnessAscending)[0]
	return card.num
}
module.exports.hard = function (stack) {
	var card = copy(stack).map(numberIt).sort(sorters.hardnessAscending)
	card = card.reverse()[0]
	return card.num
}
// The below algorithm is meant to be like a combination of hard, even, and random.
/* istanbul ignore next */
module.exports.improve = function (stack) {
	// randomNumber is between 1 and 20
	var randomNumber = Math.ceil(Math.random() * 20)

	// 45% chance of inching towards even distribution
	if (randomNumber > 11) {
		return module.exports.even(stack)
	}
	// ~33% chance of getting the hardest card
	else if (randomNumber > 5) {
		return module.exports.hard(stack)
	}
	// 25% chance of getting a random card
	else {
		return module.exports.random(stack)
	}
}
