var fs = require('fs')
var util = require('util')

// All of the converters. They take 1 argument and return data in the Flashcardz format
var converters = {
	'tab/newline': require('./tab-newline.js'),
	'objecty': require('./objecty.js'),
	'nice': require('./nice.js'),
	'single': require('./single.js')
}

module.exports = function (data, type) {
	if (typeof type === 'undefined') {
		type = util.isArray(data) ? 'nice' : 'single'
	}

	// If the type isn't recognized, throw an error
	if (Object.keys(converters).indexOf(type) === -1) {
		throw new Error('flashcardz.convert received an unknown type: ' + JSON.stringify(type))
	}
	// If there isn't any data, return nothing
	else if (typeof data === 'undefined') {
		return []
	}
	// There is data, and there is a type that is recognized. Put the data through the converter!
	else {
		return converters[type](data)
	}
}
