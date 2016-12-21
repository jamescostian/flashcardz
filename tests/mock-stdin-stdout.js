let mockIn = false
const mockOut = require('std-mocks')

// Mocks STDIN and STDOUT
const mock = () => {
  mockIn = require('mock-stdin').stdin()
  mockOut.use()
  mockOut.flush()
  process.stdout.isTTY = false
}
// Removes mocks for STDIN and STDOUT
const unMock = () => {
  mockIn.restore()
  mockOut.restore()
  process.stdout.isTTY = global.reallyIsTTY
}
// Assuming that STDOUT is mocked, this allows you to read STDOUT
const read = () => mockOut.flush().stdout
// Assuming that STDIN is mocked, this allows you to write to STDIN
const write = data => {
  mockIn = mockIn.send(data)
}

module.exports.start = mock
module.exports.stop = unMock
module.exports.read = read
module.exports.write = write
