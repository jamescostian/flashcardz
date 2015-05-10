# Flashcardz

## WARNING: this project is far from ready

[![Build Status](https://img.shields.io/travis/jamescostian/flashcardz.svg?style=flat)](https://travis-ci.org/jamescostian/flashcardz)
[![Coverage Status](https://img.shields.io/coveralls/jamescostian/flashcardz.svg?style=flat)](https://coveralls.io/r/jamescostian/flashcardz?branch=master)
[![Dependency Status](https://img.shields.io/gemnasium/jamescostian/flashcardz.svg?style=flat)](https://gemnasium.com/jamescostian/flashcardz)
[![License](https://img.shields.io/npm/l/flashcardz.svg?style=flat)](https://github.com/jamescostian/flashcardz/blob/master/LICENSE)
![NPM Version](https://img.shields.io/npm/v/flashcardz.svg)

Intelligently quizes you

# Installation

Assuming you have [Node](http://nodejs.org) and [NPM](https://npmjs.org) (which is bundled with Node), installing the CLI is as easy as:

```bash
npm install -g flashcardz
```

To use Flashcardz programatically, use

```bash
npm install --save flashcardz
```

# Examples

## CLI

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

## JS API

```js
var f = require('flashcardz')

// Convert this nice-looking object with flashcards into the Flashcardz format
var myCards = f.convert({
	ostensible: 'stated or appearing to be true, but not necessarily so.',
	palpable: 'able to be touched or felt.',
	diaphanous: '(especially of fabric) light, delicate, and translucent.'
}, 'objecty')

// Get quized on the terminal over 1 card in that stack of flashcards
var myCardsAfterQuiz = flashcardz.quiz(myCards, require('flashcardz/cli-quizzer'), flashcardz.pick.random)

// Get the term that you struggled with most from quizzes
var hardestCard = flashcardz.hardest(myCardsAfterQuiz)
console.log(hardestCard.front + ' is a difficult word.') // ex: 'ostensible is a difficult word.'
```

# Documentation

Documentation for the JS API is [here](https://github.com/jamescostian/flashcardz/tree/master/js-api.md), in `js-api.md`

Documentation for the CLI is [here](https://github.com/jamescostian/flashcardz/tree/master/cli.md), in `cli.md`

# License

This is licensed under the [MIT License](https://github.com/jamescostian/flashcardz/tree/master/LICENSE)
