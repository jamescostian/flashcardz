MODULE_BINS = node_modules/.bin
JSHINT = $(MODULE_BINS)/jshint
TAPE = $(MODULE_BINS)/tape
FAUCET = $(MODULE_BINS)/faucet
ISTANBUL = $(MODULE_BINS)/istanbul

unit:
	$(FAUCET) test/start.js

test: jshint unit

jshint:
	$(JSHINT) package.json lib test

cov:
	$(ISTANBUL) cover $(TAPE) test/start.js

travis: jshint cov

.PHONY: unit test jshint cov travis
