var merge = require('deep-extend')

// Updates a card in a specific stack with a particular ID by merging new data onto the old data of the card.
module.exports = function (stackName, id, card) {
	this.stacks[stackName][id] = merge(this.stacks[stackName][id], card)
}
