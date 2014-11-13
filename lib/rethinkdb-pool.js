var pool = require('generic-pool')
var r = flashcardz.r = require('rethinkdb')

/* istanbul ignore next */
var destroy = function (connection) {
	connection.close()
}

module.exports = pool.Pool({
	min: flashcardz.config.rethinkdb.min,
	max: flashcardz.config.rethinkdb.max,
	log: false,
	idleTimeoutMillis: flashcardz.config.rethinkdb.idleTimeout,
	reapIntervalMillis: flashcardz.config.rethinkdb.reapInterval,
	create: function (callback) {
		r.connect(flashcardz.config.rethinkdb).then(function (connection) {
			connection['_id'] = Math.floor(Math.random()*flashcardz.config.rethinkdb.max*10)
			callback(null, connection)
		}).error(callback)
	},
	destroy: destroy
})
