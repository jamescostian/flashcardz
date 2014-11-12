var deepExtend = require('deep-extend')

module.exports = function (config) {
	config = deepExtend({
		rethinkdb: {
			min: 1,
			max: 10,
			host: '127.0.0.1',
			port: 28015,
			db: 'flashcardz_unconfigured',
			tablePrefix: '',
			idleTimeout: 1000 * 60,
			reapInterval: 1000 * 10
		}
	}, config)
	return config
}
