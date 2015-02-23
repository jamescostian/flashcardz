# Change Log
All notable changes to this project will be documented in this file. This project adheres to [Semantic Versioning](http://semver.org/).

## [v0.2.0][0.2.0]
### Changed
- `require('flashcardz')()` is no longer needed - just do `require('flashcardz')`
- No more stack names and internal state - pass around the whole stacks
- `f.quiz()` takes a whole stack and returns a promise that resolves to the new stack after the quiz ends
- `f.easiest()`, `f.hardest()`, `f.gotWrong()`, and `f.gotRight()` no longer accept stack names, only stack arrays
- `f.idByFront()` and `f.idsByFront()` take stack arrays instead of stack names
- `f.import()` became `f.convert()` and no long
- Update README.md to match API and CLI changes
- Update js-api.md to match API changes
- `flash import` removed in favor of `flash convert`

### Removed
- Everything that touched the filesystem or was OOP-like
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

### Added
- `f.copy()` - get a copy of an array
- `f.convert()` now also accepts types "objecty" and "nice" - more info [here](https://github.com/jamescostian/flashcardz/blob/master/js-api.md#fconvertdata-type)
- More tests - it's Flashcardz's goal to always have 100% code coverage

## v0.1.0 - 2015-02-13
This was a preview release

[0.2.0]: https://github.com/jamescostian/flashcardz/compare/v0.1.0...HEAD
