var BPromise = require('bluebird')
var pool = require('./rethinkdb-pool')
var acquire = BPromise.promisify(pool.acquire)
var originalTable = flashcardz.r.prototype.constructor.table // the original table method from the RethinkDB driver
var originalRun = flashcardz.r.table('x').prototype.constructor.constructor.__super__.run // the original run method from the RethinkDB driver

// Monkey-patch the run method that's part of all RethinkDB queries to use the connection pool.
flashcardz.r.table('x').prototype.constructor.constructor.__super__.run = function () {
	var thisContext = this
	return new BPromise(function (resolve, reject) {
		var conn = false

		/* istanbul ignore next */
		var handleError = function (error) {
			if (conn !== false) {
				pool.release(conn)
			}
			reject(error)
		}

		acquire().then(function (myConn) {
			conn = myConn
			return originalRun.call(thisContext, conn)
		}).then(function (res) {
			pool.release(conn)
			resolve(res)
		}).error(handleError)
	})
}

// Monkey-patch the table method that's part of all RethinkDB queries to prefix all of the table names by the tablePrefix.
flashcardz.r.prototype.constructor.table = function (name) {
	return originalTable.call(this, flashcardz.config.rethinkdb.tablePrefix + name)
}
