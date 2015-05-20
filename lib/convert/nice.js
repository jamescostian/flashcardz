var single = require('./single.js')
module.exports = function (cards) {
	return cards.map(single)
}
