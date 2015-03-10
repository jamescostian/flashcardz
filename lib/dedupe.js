module.exports = function (stack) {
	// seen is an array that contains all of the cards that have been seen at least once by the loop
	var seen = []
	// Filter out duplicates
	return stack.filter(function (card) {
		// If the card is a duplicate, filter it out
		if (isDuplicate(card, seen)) {
			return false
		}
		// Otherwise, add it to the list of cards that have been seen and keep it
		else {
			seen.push(card)
			return true
		}
	})
}

var isDuplicate = function (thing, allThings) {
	// Loop through allThings
	for (var i = 0; i < allThings.length; i += 1) {
		// If the front of this card matches the front of thing and the same applies to the back, this is a duplicate!
		if (allThings[i].front === thing.front && allThings[i].back === thing.back) {
			return true
		}
	}
	return false
}
