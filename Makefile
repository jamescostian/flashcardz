MODULE_BINS = node_modules/.bin
JSHINT = $(MODULE_BINS)/jshint
MOCHA = $(MODULE_BINS)/_mocha
ISTANBUL = $(MODULE_BINS)/istanbul

test: jshint mocha

jshint:
	$(JSHINT) package.json lib test

mocha:
	$(MOCHA) --bail

cov:
	$(ISTANBUL) cover $(MOCHA)

travis: mocha
	$(ISTANBUL) cover $(MOCHA) --report lcovonly

.PHONY: test jshint mocha cov travis
