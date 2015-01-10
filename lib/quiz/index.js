var log = console.log
module.exports = function (stackName) {
	log('The quiz feature has not yet been implemented!')
}
module.exports.output = []
module.exports.silence = function () {
	log = function (data) {
		module.exports.output.push(data)
	}
}
