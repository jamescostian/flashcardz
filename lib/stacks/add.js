module.exports = function (stack, cards) {
	var insertMe = require('bluebird').resolve()
	for (var card in cards) {
		insertMe = insertMe.then(function () {
			flashcardz.r.table('cards').insert({stack: stack, name: card, definition: cards[card]}).run()
		})
	}
	return insertMe
}
