var fs = require('fs')
var tabNewline = require('./tab-newline.js')

module.exports = function (name, type) {
	if (type === 'tab/newline') {
		var file = fs.readFileSync(name)
		return tabNewline(file)
	}
	throw new Error('flashcardz.import.file received an unknown type: ' + JSON.stringify(type))
}
