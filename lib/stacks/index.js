var cardLookup = require('./card-lookup.js')
module.exports = {
	add: require('./add.js'),
	nameByID: cardLookup.nameByID,
	idByName: cardLookup.idByName
}
