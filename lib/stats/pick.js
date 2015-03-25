var sorters = require('./sort.js')
var copy = require('../copy.js')

// Assign each element
var numberIt = function (obj, number) {
	obj.num = number
	return obj
}

module.exports = {}

module.exports.random = module.exports.shuffle = function (stack) {
	return Math.floor(Math.random() * stack.length)
}
module.exports.even = function (stack) {
	var card = copy(stack).map(numberIt).sort(sorters.timesSeenAscending)[0]
	return card.num
}
module.exports.easy = function (stack) {
	var card = copy(stack).map(numberIt).sort(sorters.hardnessAscending)[0]
	return card.num
}
module.exports.hard = function (stack) {
	var card = copy(stack).map(numberIt).sort(sorters.hardnessAscending)
	console.log(card)
	card = card.reverse()[0]
	return card.num
}
