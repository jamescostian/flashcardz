'use strict';
var util = require('util')
var merge = require('deep-extend')
var loadStacks = require('./load-stacks.js')
var extendConfig = require('./extend-config.js')

var Flashcardz = function () {
	return this
}

module.exports = function (config) {
	var instance = new Flashcardz()
	instance.config = extendConfig(config)
	instance.stacks = loadStacks(instance.config)
	return instance
}

// Inserts a new stack of cards.
// If a stack already exists with the name you chose, this WILL THROW AN ERROR
Flashcardz.prototype.insert = function (stackName, stack) {
	if (typeof this.stacks[stackName] !== 'undefined') {
		throw new Error('Flashcardz: a stack with the name "' + stackName + '" already exists! You can\'t insert a stack with the same name!')
	}
	// If stack isn't an array, convert it to an array
	if (!util.isArray(stack)) {
		var obj = stack
		var keys = Object.keys(obj)
		stack = keys.map(function (key) {
			return {
				front: key,
				back: obj[key]
			}
		})
	}

	// Merge each card with a blank card to ensure that there aren't any unset variables, and insert those cards into the new stack
	this.stacks[stackName] = stack.map(function (card) {
		return merge(
			{
				front: 'unspecified',
				back: 'unspecified',
				right: 0,
				wrong: 0
			}, card)
	})
}
// Inserts a new card into a stack.
Flashcardz.prototype.insertCard = function (stackName, card) {
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
// Returns a stack of cards
Flashcardz.prototype.get = function (stack) {
	return this.stacks[stack]
}
// Updates a card in a specific stack with a particular ID or string on its front by merging new data onto the old data of the card.
// save is an optional parameter, and when set to true, this function will save the stack after it finishes updating.
Flashcardz.prototype.set = function (stack, identification, card) {
	var identificationIs = 'Front' // by default, assume identification is the front of the card
	if (typeof identification === typeof 1) {
		identificationIs = 'ID'
	}
	return this['setBy' + identificationIs](stack, identification, card)
}
// Updates a card in a specific stack with a particular ID by merging new data onto the old data of the card.
// save is an optional parameter, and when set to true, this function will save the stack after it finishes updating.
Flashcardz.prototype.setByID = function (stack, id, card) {
	this.stacks[stack][id] = merge(this.stacks[stack][id], card)
}
// Updates a card in a specific stack with a particular string on its front by merging new data onto the old data of the card.
// save is an optional parameter, and when set to true, this function will save the stack after it finishes updating.
Flashcardz.prototype.setByFront = function (stack, front, card) {
	var id = this.idByFront(stack, front)
	this.setByID(stack, id, card)
}
// Returns an array of IDs of cards in a specific stack which have a particular string on their front
Flashcardz.prototype.idsByFront = function (stack, front) {
	return this.stacks[stack].reduce(function (list, current, index) {
		if (current.front === front) {
			list.push(index)
		}
		return list
	}, [])
}
// Returns the ID of the first card in a specific stack whose front has a particular string.
// If no card is found that matches said criteria, this function will return -1, similar to [].indexOf
Flashcardz.prototype.idByFront = function (stack, front) {
	for (var i = 0; i < this.stacks[stack].length; i += 1) {
		return this.stacks[stack][i]
	}
	return -1
}
// Refreshes a stack
Flashcardz.prototype.refresh = function (stack) {
	delete this.stacks[stack]
	this.insert(stack, this.loadStack(this.config, stack))
}
Flashcardz.prototype['import'] = require('./import')
Flashcardz.prototype.save = require('./save.js')
module.exports.loadStacks = Flashcardz.prototype.loadStacks = require('./load-stacks.js')
module.exports.loadStack = Flashcardz.prototype.loadStack = require('./load-stack.js')
module.exports.getList = Flashcardz.prototype.getList = require('./get-list.js')
module.exports.hardest = Flashcardz.prototype.hardest = require('./stats/hardest.js')
module.exports.easiest = Flashcardz.prototype.easiest = require('./stats/easiest.js')
