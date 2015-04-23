var sorters = require('./sort.js')
var copy = require('../copy.js')
var discrepancies = require('./discrepancies.js')
var numberIt = require('./number-it.js')

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

// evenHardish picks either the hardest or the easiest based on which ever has a bigger discrepancy and randomness
/* istanbul ignore next */
module.exports.evenHardish = function (stack) {
	var evennessDiscrepancy = discrepancies.evenness(stack)
	var hardnessDiscrepancy = discrepancies.hardness(stack)
	var ehDiscrepancy = discrepancies(evennessDiscrepancy, hardnessDiscrepancy)
	var chancesForHard = 0.5 // the chances (from 0 to 1) of picking the hardest card instead of trying to even out the number of times each card has been seen.
	// chancesForHard starts out at 0.5 so that hard and even have equal chances. It changes based on the ehDiscrepancy

	if (hardnessDiscrepancy > evennessDiscrepancy) {
		chancesForHard += ehDiscrepancy / 2
	}
	else {
		chancesForHard -= ehDiscrepancy / 2
	}

	if (Math.random() < chancesForHard) {
		return module.exports.hard(stack)
	}
	else {
		return module.exports.even(stack)
	}
}
