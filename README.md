# Flashcardz

[![Build Status](https://img.shields.io/travis/jamescostian/flashcardz.svg?style=flat)](https://travis-ci.org/jamescostian/flashcardz)
[![Coverage Status](https://img.shields.io/coveralls/jamescostian/flashcardz.svg?style=flat)](https://coveralls.io/r/jamescostian/flashcardz?branch=master)
[![License](https://img.shields.io/npm/l/flashcardz.svg?style=flat)](https://github.com/jamescostian/flashcardz/blob/master/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/flashcardz.svg?style=flat)](https://www.npmjs.com/package/flashcardz)

Intelligently quizzes you

## Features

* Small typos are (pretty intelligently) [ignored](tests/check-answer.test.js)
* You won't be quizzed too much over things you get right
* You'll be quizzed a lot over things you get wrong
* You won't see the same card over and over again (assuming you have enough cards); you'll get enough variety to learn
* Importing stacks of cards from [Quizlet](http://quizlet.com/) works
* Comes with a [CLI](cli.md) that can help with basic things like removing duplicate cards or deleting your history of getting cards right/wrong
* Comes with an [API](js-api.md) so that you can get quizzed from any interface (not just a terminal emulator)

## Install

Assuming you have [Node](http://nodejs.org), installing the CLI is as easy as:

```bash
npm install -g flashcardz
```

To use Flashcardz programatically, use

```bash
npm install --save flashcardz
```

## Usage

### CLI

Say you have a file called `myfile` with flashcards (each card has a "front" and a "back" - normally, you see the front first and have to recall what the back is). Let's say `myfile` looks like this:

```
ostensible	stated or appearing to be true, but not necessarily so.
palpable	able to be touched or felt.
diaphanous	(especially of fabric) light, delicate, and translucent.
```

**ProTip™**: if you're studying stuff on [Quizlet](http://quizlet.com), you can just export your set of cards with the default settings to get a file like `myfile` in this example

Converting that file to a Flashcardz stack would look like this:

```bash
flash convert myfile tab/newline > mystack
```

The command above will convert `myfile` to a "stack" which would be saved as `mystack` which you can be quized on if you run:

```bash
flash quiz mystack
```

The CLI has many other commands. If you run `flash help` you can see a list of them and the arguments they take. You can also get help for individual commands with `flash help [command]`, e.g. `flash help convert`

### JS API

```js
const f = require('flashcardz')

// Convert this nice-looking object with flashcards into the Flashcardz format
const myCards = f.convert({
  ostensible: 'stated or appearing to be true, but not necessarily so.',
  palpable: 'able to be touched or felt.',
  diaphanous: '(especially of fabric) light, delicate, and translucent.'
}, 'objecty')

// Get quized on the terminal over 1 card in that stack of flashcards
const myCardsAfterQuiz = flashcardz.quiz(myCards, require('flashcardz/cli-quizzer'), flashcardz.pick.random)

// Get the term that you struggled with most from quizzes
const hardestCard = flashcardz.hardest(myCardsAfterQuiz)
console.log(hardestCard.front + ' is a difficult word.') // ex: 'ostensible is a difficult word.'
```

## Documentation

Documentation for the JS API is [here](https://github.com/jamescostian/flashcardz/blob/master/js-api.md), in `js-api.md`

Documentation for the CLI is [here](https://github.com/jamescostian/flashcardz/blob/master/cli.md), in `cli.md`

## Contributing

Contributions welcome! Please read the [contributing guidelines](https://github.com/jamescostian/flashcardz/blob/master/CONTRIBUTING.md) first.

## License

This is licensed under the [ISC License](https://github.com/jamescostian/flashcardz/blob/master/LICENSE)
