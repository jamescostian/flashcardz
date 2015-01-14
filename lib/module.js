'use strict';
var extendConfig = require('./extend-config.js')

module.exports = function (config) {
	// Create a new instance of flashcardzBase, defined later in this file
	var instance = Object.create(flashcardzBase)
	instance.config = extendConfig(config)
	instance.stacks = {}
	return instance
}

var flashcardzBase = {}

flashcardzBase.insertStack = flashcardzBase.insert = require('./basics/insert-stack.js')
flashcardzBase.insertCard = require('./basics/insert-card.js')
flashcardzBase.getStack = flashcardzBase.get = require('./basics/get-stack.js')
flashcardzBase.setByID = require('./basics/set-by-id.js')
flashcardzBase.setByFront = require('./basics/set-by-front.js')
flashcardzBase.setCard = require('./basics/set-card.js')
flashcardzBase.idsByFront = require('./basics/ids-by-front.js')
flashcardzBase.idByFront = require('./basics/id-by-front.js')

flashcardzBase.loadStacks = require('./persistence/load-stacks.js')
flashcardzBase.loadStack = require('./persistence/load-stack.js')
flashcardzBase.getList = require('./persistence/get-list.js')
flashcardzBase.refresh = require('./persistence/refresh.js')
flashcardzBase.save = require('./persistence/save.js')

flashcardzBase.hardest = require('./stats/hardest.js')
flashcardzBase.easiest = require('./stats/easiest.js')
flashcardzBase.gotWrong = require('./stats/got-wrong.js')
flashcardzBase.gotRight = require('./stats/got-right.js')

flashcardzBase['import'] = require('./import')
flashcardzBase.quiz = require('./quiz')
