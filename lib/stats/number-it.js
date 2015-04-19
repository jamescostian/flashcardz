// Set the num key of an object to number
module.exports = function (obj, number) {
	obj.num = number
	return obj
}

// The cool thing about this is that if you do something like:
//    [{}, {}].map(module.exports)
// You'll wind up with:
//    [{num: 0}, {num: 1}]
// This is useful if you need to number elements before sorting them so that after sorting them you can find their original IDs.
// For example:
//    [{foo: 'bar'}, {foo: 'baz'}].map(module.exports).sort(someFunction)
// Might return:
//    [{foo: 'baz', num: 1}, {foo: 'bar', num: 0}]
// So that if you were to take an element's num key, you would get it's ID in the original array (before the sorting)
