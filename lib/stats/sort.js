// Sorts cards based on their hardness in ascending order (easiest to hardest)
module.exports.hardnessAscending = function (cardA, cardB) {
	if (cardA.wrong + cardA.right < 1 && cardB.wrong + cardB.right < 1) {
		// Neither card has ever been seen. Use alphabetical order of fronts
		if (cardA.front > cardB.front) {
			return 1
		}
		else if (cardA.front < cardB.front) {
			return -1
		}
		else {
			return 0
		}
	}
	else if (cardA.wrong + cardA.right < 1) {
		// cardA has never been seen, so it's harder
		return 1
	}
	else if (cardB.wrong + cardB.right < 1) {
		// cardB has never been seen, so it's harder
		return -1
	}
	else {
		// Both cards have been seen
		var hardnessA = cardA.wrong / (cardA.wrong + cardA.right)
		var hardnessB = cardB.wrong / (cardB.wrong + cardB.right)
		return hardnessA - hardnessB
	}
}

// Sorts cards based on how many times they were missed in ascending order (least missed to most missed)
module.exports.missesAscending = function (cardA, cardB) {
	return cardA.wrong - cardB.wrong
}

// Sorts cards based on how many times they were not missed in ascending order (least time correct to most times correct)
module.exports.hitsAscending = function (cardA, cardB) {
	return cardA.right - cardB.right
}

// Sorts cards based on number of times attempted in ascending order (fewest times attempted to most times attempted)
module.exports.timesSeenAscending = function (cardA, cardB) {
	var attemptsA = cardA.wrong + cardA.right
	var attemptsB = cardB.wrong + cardB.right
	return attemptsA - attemptsB
}
