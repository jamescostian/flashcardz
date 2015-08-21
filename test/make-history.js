module.exports = function (right, wrong) {
  var history = []
  for (var i = 0; i < right; i += 1) {
    history.push({
      recalled: true,
      time: new Date()
    })
  }
  for (var j = 0; j < wrong; j += 1) {
    history.push({
      recalled: false,
      time: new Date()
    })
  }
  return history
}
