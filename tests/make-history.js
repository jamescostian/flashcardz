module.exports = (right, wrong) => {
  let history = []
  for (let i = 0; i < right; i += 1) {
    history.push({
      recalled: true,
      time: new Date()
    })
  }
  for (let i = 0; i < wrong; i += 1) {
    history.push({
      recalled: false,
      time: new Date()
    })
  }
  return history
}
