var fs = require('fs')
var basename = require('path').basename

// Return the JS array from the stack file based on the stack's name and the config object.
module.exports = function (stackName) {
	var stackFileName = basename(stackName) + '.flashcardz-stack'
	var stackString = fs.readFileSync(this.config.path + '/' + stackFileName)
	return JSON.parse(stackString.toString())
}
