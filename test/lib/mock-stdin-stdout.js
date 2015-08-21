var mockIn = false
var mockOut = require('std-mocks')

// Mocks STDIN and STDOUT
var mock = function () {
  mockIn = require('mock-stdin').stdin()
  mockOut.use()
  mockOut.flush()
  process.stdout.isTTY = false
}
// Removes mocks for STDIN and STDOUT
var unMock = function () {
  mockIn.restore()
  mockOut.restore()
  process.stdout.isTTY = global.reallyIsTTY
}
// Assuming that STDOUT is mocked, this allows you to read STDOUT
var read = function () {
  return mockOut.flush().stdout
}
// Assuming that STDIN is mocked, this allows you to write to STDIN
var write = function (data) {
  mockIn = mockIn.send(data)
}

module.exports.start = mock
module.exports.stop = unMock
module.exports.read = read
module.exports.write = write
