var assert = require('assert')
var fs = require('fs')
var extend = require('../lib/extend-config.js')

describe('extend-config', function () {
	var config
	var thePath = __dirname + '/.deleteme'
	before(function () {
		config = extend({path: thePath})
	})
	it('should work', function () {
		assert.equal(typeof config, typeof {}, 'config should be an object')
		assert.equal(typeof config.path, 'string', 'config.path should be a string')
		assert.ok(fs.existsSync(thePath), 'should create a dir for config.path if config.path does not exist')
		assert.ok(fs.existsSync(thePath + '/stacks.list'), 'should create a stacks.list file in config.path if that file does not exist')
		// Overwrite stacks.list
		fs.writeFileSync(thePath + '/stacks.list', 'yo')
		extend({path: thePath})
		assert.equal(fs.readFileSync(thePath + '/stacks.list'), 'yo', 'extendConfig should not overwrite stacks.list')
	})
	after(function () {
		require('rimraf').sync(thePath)
	})
})
