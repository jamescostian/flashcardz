var merge = require('deep-extend')

// Inserts a new card into a stack.
module.exports = function (stackName, card) {
	if (Object.keys(card).length === 1 && typeof card.front === 'undefined' && typeof card.back === 'undefined') {
		// card is in the format of {front: back} so it should be converted to {front: front, back: back}
		var front = Object.keys(card)[0]
		var back = card[front]
		return this.insertCard(stackName, {front: front, back: back})
	}
	var blankCard = {
		front: 'unspecified',
		back: 'unspecified',
		right: 0,
		wrong: 0
	}
	this.stacks[stackName].push(merge(blankCard, card))
}
