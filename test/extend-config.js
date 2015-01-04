var test = require('tape')
var extend = require('../lib/extend-config.js')

test('extend-config', function (t) {
	var config
	config = extend()
	t.equal(typeof config, typeof {}, 'config should be an object')
	t.equal(typeof config.path, 'string', 'config.path should be a string')
	config = extend({path: 'x'})
	t.equal(config.path, 'x', 'config.path should not be overridden')
	t.end()
})
