module.exports = decodeMe => {
  const list = decodeMe.toString().split('\n')
  if (typeof list[list.length - 1] === 'undefined' || list[list.length - 1] === null || list[list.length - 1] === '') {
    list.pop()
  }
  return list.map(pair => {
    const split = pair.split('\t')
    const card = {
      front: split[0].length === 0 ? 'unspecified' : split[0],
      back: typeof split[1] === 'undefined' || split[1].length === 0 ? 'unspecified' : split[1],
      history: []
    }
    return card
  })
}
