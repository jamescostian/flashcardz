'use strict';
var traceur = require('traceur')

traceur.require.makeDefault(function (filename) {
	// Don't transpile dependencies
	return filename.indexOf('node_modules') === -1
}, {
	// Experimental options:
	arrayComprehension: true,
	asyncFunctions: true,
	exponentiation: true,
	symbols: true
})
