module.exports = obj => {
  const keys = Object.keys(obj)
  return keys.map(key => ({
    front: key,
    back: obj[key],
    history: []
  }))
}
