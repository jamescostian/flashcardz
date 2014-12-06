var test = require('tape')
var fs = require('fs')
var extend = require('../lib/extend-config.js')

test('extend-config', function (t) {
	var config
	var thePath = __dirname + '/.deleteme'
	config = extend({path: thePath})

	t.equal(typeof config, typeof {}, 'config should be an object')
	t.equal(typeof config.path, 'string', 'config.path should be a string')
	t.ok(fs.existsSync(thePath), 'should create a dir for config.path if config.path does not exist')
	t.ok(fs.existsSync(thePath + '/stacks.list'), 'should create a stacks.list file in config.path if that file does not exist')
	// Overwrite stacks.list
	fs.writeFileSync(thePath + '/stacks.list', 'yo')
	extend({path: thePath})
	t.equal(fs.readFileSync(thePath + '/stacks.list').toString(), 'yo', 'extendConfig should not overwrite stacks.list')

	require('rimraf').sync(thePath)
	t.end()
})
