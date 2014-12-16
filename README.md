# Flashcardz

## Alpha stage; nowhere near stable or even useable

[![Build Status](https://img.shields.io/travis/jamescostian/flashcardz.svg?style=flat)](https://travis-ci.org/jamescostian/flashcardz)
[![Coverage Status](https://img.shields.io/coveralls/jamescostian/flashcardz.svg?style=flat)](https://coveralls.io/r/jamescostian/flashcardz?branch=master)

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

**ProTip™**: if you're studying stuff on [Quizlet](http://quizlet.com), you can just export your set of cards with the default settings.

More formats will be accepted in the future.

Importing the stack would look like this:

```bash
flash --import --type=tab/newline --file=myfile myquiz1
```

The command above will import `myfile` to a "stack" named `myquiz1` which you can be quized on if you run:

```bash
flash --quiz myquiz1
```

## JS API

```js
// Initialize flashcardz, and save everything in ~/test/
var flashcardz = require('flashcardz')({path: '~/test/'})

// Add a stack of flashcards
flashcardz.insert('myStackOfFlashcards', {
	ostensible: 'stated or appearing to be true, but not necessarily so.',
	palpable: 'able to be touched or felt.',
	diaphanous: '(especially of fabric) light, delicate, and translucent.'
})

// Get quized on the terminal with that stack of flashcards
flashcardz.quiz(flashcardz.get('myStackOfFlashcards'))
// (optional) save the quiz data
flashcardz.save('myStackOfFlashcards')

// Get the term that you struggled with most from the quiz
var hardestCard = flashcardz.hardest(flashcardz.get('myStackOfFlashcards'))
console.log(hardestCard.front + ' is a difficult word.') // ex: 'palpable is a difficult word.'
```
