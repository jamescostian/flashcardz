var sorters = require('./sort.js')
var copy = require('../copy.js')
var numberIt = require('./number-it.js')

// Sort of like the difference between x and y, except it's relative to x + y.
// So it returns a percentage (so the value is between 0 and 1)
var discrepancy = function (x, y) {
	if (y === 0 && x === 0) {
		return 0
	}
	else if (x + y === 0) {
		// They're on opposite ends of 0, so they have the largest discrepancy possible
		return 1
	}

	var difference = Math.abs(x - y)
	return difference / (x + y)
}

// If you have a card that's been seen a couple times and another that has never been seen, evennessDiscrepancy will return 1
// If all of the cards in the stack have been seen an equal number of times, evennessDiscrepancy will return 0
// Otherwise, evennessDiscrepancy will return a number between 0 and 1 based on how big the discrepancy is between the number of times the most seen and least seen cards have been seen.
// That number (the one between 0 and 1) will be affected by the magnitude of the least seen card, too.
// So if there's a stack with two cards and one was seen twice while the other was seen four times, that stack's evennessDiscrepancy will be higher than a stack with two cards where one was seen 100 times and the other 102 times.
// There is one override though: if none of the cards have been seen, then evennessDiscrepancy returns 1
var evennessDiscrepancy = function (stack) {
	var list = copy(stack).map(numberIt).sort(sorters.timesSeenAscending)
	var leastSeen = list[0]
	var mostSeen = list[list.length - 1]
	if (mostSeen.right + mostSeen.wrong < 1) {
		return 1
	}
	return discrepancy(mostSeen.right + mostSeen.wrong, leastSeen.right + leastSeen.wrong)
}

// Like evennessDiscrepancy, except for hardness.
// However, if any of the cards have not been seen yet, then this will return 0
var hardnessDiscrepancy = function (stack) {
	var leastSeenCard = copy(stack).map(numberIt).sort(sorters.timesSeenAscending)[0]
	if (leastSeenCard.right + leastSeenCard.wrong < 1) {
		// At least one card has never been seen
		return 0
	}
	else {
		var list = copy(stack).map(numberIt).sort(sorters.hardnessAscending)
		var easiest = list[0]
		var hardest = list[list.length - 1]
		var easiestHardness = easiest.wrong / (easiest.wrong + easiest.right)
		var hardestHardness = hardest.wrong / (hardest.wrong + hardest.right)
		return discrepancy(easiestHardness, hardestHardness)
	}
}

module.exports = discrepancy
module.exports.evenness = evennessDiscrepancy
module.exports.hardness = hardnessDiscrepancy
