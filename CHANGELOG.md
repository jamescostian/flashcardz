# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- Support for Node v6 and beyond

### Changed
- Use Jest instead of tape + NYC

### Removed
- Support for versions of Node before v5
- `f.copy` - the implementation was poor, and in any case, `Object.assign({}, card)` is available in this day and age.

## [v0.2.3][0.2.3] - 2016-12-11
### Changed
- Updated deps, use NYC instead of Istanbul
- Use stream-string instead of the repeated, manual implementations of it throughout the files in `bin`

## [v0.2.2][0.2.2] - 2016-05-23
### Changed
- Updated deps

## [v0.2.1][0.2.1] - 2015-10-08
### Added
- Code of Conduct
- Support for Node 4.x.x

### Changed
- Switch from special JSHint rules to [standard](https://github.com/feross/standard)
- Make project files more in line with those from [module-init](https://github.com/ngoldman/module-init)
- Switch from MIT to ISC
- CLI quizzer now indents everything uniformly
- Misc dep updates

## [v0.2.0][0.2.0] - 2015-06-09
### Added
- Support for Node v0.12
- `f.pick.smart()` - a new way to intelligently pick a card
- `require('flashcardz/cli-quizzer')` - now Flashcardz comes with an independent quizzer for use on a terminal
- `f.copy()` - get a copy of an array
- `f.rightWrong()` - how many times has a card/stack been gotten right/wrong?
- `f.addHistoryEvent()` - add an event to the history of a card
- `f.dedupe()` - remove duplicate cards from a stack
- `f.convert()` now also accepts types "objecty", "nice", and "single" - more info [here](https://github.com/jamescostian/flashcardz/blob/master/js-api.md#fconvertdata-type)
- More tests - it's Flashcardz's goal to always have 100% code coverage
- `flash combine` - for combining multiple Flashcardz files
- `flash dedupe` - remove duplicate terms
- `flash reset` - reset cards by removing their history

### Changed
- `require('flashcardz')()` is no longer needed - just do `require('flashcardz')`
- No more stack names and internal state - pass around the whole stacks
- `f.quiz()` takes a whole stack and returns a promise that resolves to the new stack after the quiz ends
- `f.easiest()`, `f.hardest()`, `f.gotWrong()`, and `f.gotRight()` no longer accept stack names, only stack arrays
- `f.idByFront()` and `f.idsByFront()` take stack arrays instead of stack names
- `f.import()` became `f.convert()`, which returns a stack-based representation of whatever data it gets
- Made most binary files accept data from STDIN
- Update README.md to match API and CLI changes
- Update js-api.md and cli.md to match API and CLI changes
- `flash import` removed in favor of `flash convert`
- New flashcardz format - instead of having a `right` and `wrong` key, a `history` key is used instead. The `history` is an array of objects, where each object represents a time that the user attempted to respond to seeing a flashcard. Each event has a `time` and a boolean called `recalled` - if the user got it right, `recalled` is set to `true`, otherwise it is `false`
- More web-friendly! You can `require('flashcardz')` with [Browserify](http://browserify.org/) and it'll work just fine, and it won't use any dependencies

### Removed
- Support for Node v0.10 and v0.11 - use v0.12 or [io.js](https://iojs.org) instead
- Everything that was better off being accomplished with other tools, or was OOP-like
- `extend-config`
- `f.insertStack()`
- `f.insertCard()`
- `f.getStack()`
- `f.setCard()`
- `f.setByID()`
- `f.setByFront()`
- `f.save()`
- `f.loadStacks()`
- `f.loadStack()`
- `f.getList()`
- `f.refresh()`
- `f.config`
- `f.stacks`
- `flash ls`
- `flash cat`
- `flash write`
- `flash append`
- `flash rm`
- `flash mv`
- `flash cp`

## v0.1.0 - 2015-02-13
This was a preview release

[unreleased]: https://github.com/jamescostian/flashcardz/compare/v0.2.3...HEAD
[0.2.3]: https://github.com/jamescostian/flashcardz/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/jamescostian/flashcardz/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/jamescostian/flashcardz/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/jamescostian/flashcardz/compare/v0.1.0...v0.2.0
