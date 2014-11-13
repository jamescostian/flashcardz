# Flashcardz

## Alpha stage; nowhere near stable or even useable

Intelligently quizes you

# Installation

Assuming you have [Node](http://nodejs.org) and [NPM](https://npmjs.org) (which is bundled with Node), as well as [RethinkDB](http://rethinkdb.com) you can just run:

```
npm install -g flashcardz
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
flash-import --type=tab/newline myfile myquiz1
```

The command above will import `myfile` to a "stack" named `myquiz1` which you can be quized on if you run:

```
flash myquiz1
```

## JS API

```
var config = {
	rethinkdb: {
		host: '127.0.0.1',
		port: 28015,
		db: 'myflashcardz',
		tablePrefix: '' // totally optional; just adds a prefix to all of the tables flashcardz uses
	}
}

require('flashcardz')(config)

// Add a stack of flashcards
flashcardz.stacks.add('myStackOfFlashcards', {
	ostensible: "stated or appearing to be true, but not necessarily so.",
	palpable: "able to be touched or felt.",
	diaphanous: "(especially of fabric) light, delicate, and translucent."
})

// Get quized on the terminal with that stack of flashcards
flashcardz.quiz('myStackOfFlashcards')

// Get the term that you struggled with most from the quiz(es)
var hardestTermID = flashcardz.stats('myStackOfFlashcards', 'hardest') // ex: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
console.log(flashcardz.stacks.nameByID(hardestTermID)) // ex: "palpable"
```
