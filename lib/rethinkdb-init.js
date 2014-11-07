let rethinkdb = require('rethinkdb')
let pool = require('./rethinkdb-pool')
let originalTable = rethinkdb.prototype.constructor.table // the original table method from the RethinkDB driver
let originalRun = rethinkdb.table('x').prototype.constructor.constructor.__super__.run // the original run method from the RethinkDB driver

// Monkey-patch the run method that's part of all RethinkDB queries to use the connection pool.
rethinkdb.table('x').prototype.constructor.constructor.__super__.run = function (options) {
	return new Promise((resolve, reject) => {
		let conn = false
		pool.acquire().then((myConn) => {
			conn = myConn
			return originalRun.call(this, conn, options)
		}).then((res) => {
			pool.release(conn)
			resolve(res)
		}).error((err) => {
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
