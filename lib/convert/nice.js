var merge = require('deep-extend')

module.exports = function (cards) {
	return cards.map(function (card) {
		return merge({
				front: 'unspecified',
				back: 'unspecified',
				right: 0,
				wrong: 0
			}, card)
	})
}
