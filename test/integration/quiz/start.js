var test = require('tape')
var thePath = __dirname + '/.deleteme-api'
require('rimraf').sync(thePath)
var flashcardz = require('../../../lib/module.js')({path: thePath})

test('Quizzing functionality', function (t) {
	t.plan(1)
	flashcardz.insert('st', {
		a: 'first',
		b: 'second',
		c: 'third'
	})
	t.ok(true)
	t.end()
})
