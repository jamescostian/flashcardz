// Updates a card in a specific stack with a particular ID or string on its front by merging new data onto the old data of the card.
module.exports = function (stackName, identification, card) {
	var identificationIs = 'Front' // by default, assume identification is the front of the card
	if (typeof identification === typeof 1) {
		identificationIs = 'ID'
	}
	return this['setBy' + identificationIs](stackName, identification, card)
}
