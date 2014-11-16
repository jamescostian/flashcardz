# Flashcardz

## Alpha stage; nowhere near stable or even useable

[![Build Status](https://img.shields.io/travis/jamescostian/flashcardz.svg?style=flat)](https://travis-ci.org/jamescostian/flashcardz)
[![Coverage Status](https://img.shields.io/coveralls/jamescostian/flashcardz.svg?style=flat)](https://coveralls.io/r/jamescostian/flashcardz?branch=master)

Intelligently quizes you

# Installation

Assuming you have [Node](http://nodejs.org) and [NPM](https://npmjs.org) (which is bundled with Node), installing the CLI is as easy as:

```
npm install -g flashcardz
```

To use Flashcardz programatically, use

```
npm install --save flashcardz
```

# Examples

## CLI

I'm going to assume you have a file called `myfile` which has a number of term-definition pairs, where the pairs are separated by newlines and the terms are separated from their definitions by tabs. Here's an example of a file in this format:

```
ostensible	stated or appearing to be true, but not necessarily so.
palpable	able to be touched or felt.
diaphanous	(especially of fabric) light, delicate, and translucent.
```

If you can find your terms on [Quizlet](http://quizlet.com), you can just export them and by default they will already be in this format.
More formats will be accepted in the future.

Importing the file with all of your words (assuming your file is called `myfile` and you've installed Flashcardz) is as simple as running: 

```
flash import --type=tab/newline myfile myquiz1
```

The command above will import `myfile` to a "stack" named `myquiz1` which you can be quized on if you run:

```
flash myquiz1
```

## JS API

```
var flashcardz = require('flashcardz')({path: '~/.flashcardz/'})

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
