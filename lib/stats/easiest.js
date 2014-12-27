var hardnessAscending = require('./sort.js').hardnessAscending

module.exports = function (stack, count, key) {
	if (typeof stack === 'string') {
		stack = this.get(stack)
	}
	// Calling this function with (stack, key) should be the same as calling it with (stack, 1, key)
	if (typeof count === 'string') {
		key = count
		count = 1
	}
	// count should be optional, and default to 1
	if (typeof count === 'undefined') {
		count = 1
	}
	// key should default to all of the keys
	if (typeof key === 'undefined') {
		key = 'all'
	}

	// sorted has all of the cards sorted easiest to hardest
	var sorted = stack.sort(hardnessAscending)

	if (count === 1) {
		if (key === 'all') {
			return sorted[0]
		}
		else {
			return sorted[0][key]
		}
	}

	// Only keep the number of cards specified by count in limited
	var limited = sorted.slice(0, count)
	if (key === 'all') {
		return limited
	}
	else {
		return limited.map(function (card) {
			return card[key]
		})
	}
}
