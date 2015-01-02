// Updates a card in a specific stack with a particular string on its front by merging new data onto the old data of the card.
module.exports = function (stackName, front, card) {
	var id = this.idByFront(stackName, front)
	this.setByID(stackName, id, card)
}
