var assert = require('assert')
var validator = require('validator')
var BPromise = require('bluebird')
require('../lib/module.js')({})

describe('stacks', function () {
	before(function (done) {
		flashcardz.r.tableList().contains('cards').run().then(function (dbExists) {
			if (dbExists) {
				return BPromise.resolve()
			}
			else {
				return flashcardz.r.tableCreate('cards').run()
			}
		}).then(function () {
			flashcardz.r.table('cards').filter({stack: 'x-testing'}).delete()
		}).then(function () {
			done()
		}).error(function (err) {
			throw err
			done()
		})
	})
	it('should work', function (done) {
		flashcardz.stacks.add('x-testing', {a: 'b'}).then(function () {
			return flashcardz.stacks.idByName('x-testing', 'a')
		}).then(function (data) {
			assert(validator.isUUID(data), 'idByName should return a UUID')
			return flashcardz.stacks.nameByID(data)
		}).then(function (data) {
			assert.equal(data, 'a', 'nameByID should work')
			return flashcardz.r.table('cards').filter({stack: 'x-testing'}).count().run()
		}).then(function (data) {
			assert.equal(data, 1, 'only 1 card should exist, because only 1 card was added')
			return flashcardz.r.table('cards').filter({stack: 'x-testing'}).delete().run()
		}).then(function () {
			done()
		}).error(function (err) {
			throw err
			done()
		})
	})
})
