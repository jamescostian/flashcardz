// Make a copy something
module.exports = function (thing) {
	return JSON.parse(JSON.stringify(thing))
}
