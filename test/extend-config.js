var assert = require('assert')

var extend = require('../lib/extend-config.js')

describe('extend-config', function () {
	it('should create needed objects if passed undefined', function () {
		assert.equal(typeof extend(), typeof {})
		assert.equal(typeof extend().rethinkdb, typeof {})
	})
	it('should create needed objects if passed a blank object', function () {
		assert.equal(typeof extend({}), typeof {})
		assert.equal(typeof extend().rethinkdb, typeof {})
	})
	describe('non-blank objects passed to extend-config', function () {
		var config = extend({rethinkdb: {port: 'hi'}}) // This should overwrite the returned object's rethinkdb.port to "hi"
		var config2 = extend({rethinkdb2: {port: 'hi'}}) // This should not overwrite anything, but rethinkdb2 should be preserved
		it('should create needed objects', function () {
			assert.equal(typeof config, typeof {}, 'config should be an object')
			assert.equal(typeof config.rethinkdb, typeof {}, 'config.rethinkdb should be an object')
			assert.equal(typeof config2, typeof {}, 'config2 should be an object')
			assert.equal(typeof config2.rethinkdb, typeof {}, 'config2.rethinkdb should be an object')
		})
		it('should preserve options it doesn\'t understand', function () {
			assert.equal(typeof config2.rethinkdb2, typeof {})
		})
		it('should not overwrite things', function () {
			assert.equal(config.rethinkdb.port, 'hi')
		})
	})
})
