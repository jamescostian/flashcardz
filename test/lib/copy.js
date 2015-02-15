var test = require('tape')
var copy = require('../lib/copy.js')

test('copy', function (t) {
	var original = []
	var theCopy = copy(original)
	t.equal(theCopy.length, original.length, 'Both theCopy and original should have the same length')
	theCopy.push('hello')
	t.equal(theCopy.length, 1, 'theCopy should have a new element')
	t.equal(original.length, 0, 'original should not have a new element')
	original.push('bye')
	t.equal(theCopy.length, 1, 'theCopy should not have gained a new element')
	t.equal(theCopy[0], 'hello', 'theCopy should have the same element as before')
	t.equal(original.length, 1, 'original should have an element')
	t.equal(original[0], 'bye', 'original should have its new element')


	original = null
	theCopy = null

	original = [3, 5, 7]
	theCopy = copy(original)
	t.equal(theCopy.length, original.length, 'Both theCopy and original should have the same length')
	theCopy.push(9)
	t.equal(theCopy.length, 4, 'theCopy should have a new element')
	t.equal(original.length, 3, 'original should not have a new element')
	original.push(11)
	t.equal(theCopy.length, 4, 'theCopy should not have gained a new element')
	t.equal(theCopy[3], 9, 'theCopy should have the same last element as before')
	t.equal(original.length, 4, 'original should have a new element')
	t.equal(original[3], 11, 'original should have its new element')
	theCopy.shift()
	t.equal(theCopy.length, 3, 'theCopy should have lost an element')
	t.equal(theCopy[2], 9, 'theCopy should have the same last element as before')
	t.equal(original.length, 4, 'original should not have changed in length')
	t.equal(original[3], 11, 'original\'s last element should still be the same')


	t.end()
})
