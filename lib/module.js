'use strict';
module.exports = function (config) {
	global.flashcardz = {}
	flashcardz.config = require('./extend-config.js')(config)
	flashcardz.r = require('./rethinkdb-init.js')
	flashcardz['import'] = require('./import')
	flashcardz.stacks = require('./stacks')
	flashcardz.stats = require('./stats')
}
