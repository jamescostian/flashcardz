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

# API

## Initialization

First of all, you need to initialize Flashcardz. Here's one way to initialize Flashcardz

```js
var flashcardz = require('flashcardz')()
```

The above code will instruct Flashcardz to save all of its data in the `~/.flashcardz` directory (which will be created if it does not exist). Flashcardz will also automatically read stuff from that directory (not all files in that directory! Only the files that Flashcardz uses).

You can also make flashcardz save everything in a different directory:

```js
var flashcardz = require('flashcardz')({path: __dirname + '/special/path'})
```

The rest of this API documentation assumes that you have already initialized Flashcardz with one of the above methods. I'm also going to use `f` for `flashcardz`.

## Walk-Through

This API is kinda meant to be a walk-through like in a video game. Get ready to try out some code! First do this:

```bash
npm install flashcardz
node
```

And then type in:

```js
var f = require('flashcardz')()
```

And then you'll be set!

## Note About Files

Flashcardz can read and write files, and make directories. But, it **will not touch the file system unless you tell it to**. Here's a list of things that mess with the file system and alternatives that do not touch the file system:

+ `f.getList` - use `Object.keys(f.stacks)` instead
+ `f.loadStack` - use `f.insertStack`
+ `f.loadStacks` - use `f.insertStack` for each stack
+ `f.refresh` - use `f.stacks = {}` and then use `f.insertStack` for each stack
+ `f.save` - no alternatives
+ `f.import` - no alternatives

Also, please note that all file system reading/writing is done **synchronously**. I wanted the whole API to be synchronous, because I felt like that made the API simpler.

Each stack of flashcards gets its own file, which starts with the name of the stack and ends with `.flashcardz-stack`

## `f.insertStack(stackName, stack)`

Aliased to `f.insert` for brevity.

Pass it a name for the stack and the stack itself. For example:

```js
f.insert('hi', [
		{
			front: 'ostensible',
			back: 'stated or appearing to be true, but not necessarily so.',
			right: 3,
			wrong: 5
		},
		{
			front: 'palpable',
			back: 'able to be touched or felt.',
			right: 0,
			wrong: 6
		}
])
```

But that code is way too long. So if you're fine with assuming that the user has never gotten the card right or wrong, you can just do something like this:

```js
f.insert('theSameAsHi', {
	ostensible: 'stated or appearing to be true, but not necessarily so.',
	palpable: 'able to be touched or felt.'
})
```

If you try to insert a stack with the same name as another stack, this function will throw an error.

If you use the longer form of expressing a stack, the `right` and `wrong` keys are optional, and they both default to 0.

## `f.insertCard(stackName, card)`

Pass it the name of the stack in which you'd like to insert the card, as well as the card itself. Just like `f.insertStack()`, this function supports 2 different ways of defining cards. The following two examples are equivalent:

```js
f.insertCard('hi', {
	front: 'ostensible',
	back: 'stated or appearing to be true, but not necessarily so.',
	right: 0,
	wrong: 0
})
// is the same as
f.insertCard('hi', {'ostensible': 'stated or appearing to be true, but not necessarily so.'})
```

If you use the longer form of expressing a stack, the `right` and `wrong` keys are optional, and they both default to 0.
