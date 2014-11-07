let pool = require('generic-pool')
let r = require('rethinkdb')

module.exports = pool.Pool({
	min: flashcardz.config.rethinkdb.min,
	max: flashcardz.config.rethinkdb.max,
	log: false,
	idleTimeoutMillis: flashcardz.config.rethinkdb.idleTimeout,
	reapIntervalMillis: flashcardz.config.rethinkdb.reapInterval,
	create: (callback) => {
		r.connect(flashcardz.config.rethinkdb).then((connection) => {
			connection['_id'] = Math.floor(Math.random()*flashcardz.config.rethinkdb.max*10)
			callback(null, connection)
		}).error((err) => callback(err))
	},
	destroy: (connection) => connection.close()
})
