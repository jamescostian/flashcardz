var fs = require('fs')

// Get a list of all of the stacks
module.exports = function () {
	if (!fs.existsSync(this.config.path)) {
		fs.mkdirSync(this.config.path)
	}

	return fs.readdirSync(this.config.path).filter(function (name) {
		return name.indexOf('.flashcardz-stack') !== -1
	}).map(function (name) {
		return name.substr(0, name.lastIndexOf('.flashcardz-stack'))
	})
}
