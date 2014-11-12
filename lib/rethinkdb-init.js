//var Promise = require('bluebird')
var rethinkdb = require('rethinkdb')
var pool = require('./rethinkdb-pool')
var originalTable = rethinkdb.prototype.constructor.table // the original table method from the RethinkDB driver
var originalRun = rethinkdb.table('x').prototype.constructor.constructor.__super__.run // the original run method from the RethinkDB driver

// Monkey-patch the run method that's part of all RethinkDB queries to use the connection pool.
rethinkdb.table('x').prototype.constructor.constructor.__super__.run = function (options) {
	var thisContext = this
	return new Promise(function (resolve, reject) {
		var conn = false
		pool.acquire().then(function (myConn) {
			conn = myConn
			return originalRun.call(thisContext, conn, options)
		}).then(function (res) {
			pool.release(conn)
			resolve(res)
		}).error(function (err) {
			if (conn !== false) {
				pool.release(conn)
			}
			reject(err)
		})
	})
}

// Monkey-patch the table method that's part of all RethinkDB queries to prefix all of the table names by the tablePrefix.
rethinkdb.prototype.constructor.table = function (name, options) {
	return originalTable.call(this, flashcardz.config.rethinkdb.tablePrefix + name, options)
}

module.exports = rethinkdb
