module.exports = function (obj) {
	var keys = Object.keys(obj)
	return keys.map(function (key) {
		return {
			front: key,
			back: obj[key],
			right: 0,
			wrong: 0
		}
	})
}
