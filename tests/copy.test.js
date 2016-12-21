const copy = require('../lib/copy.js')

describe('copy', () => {
  describe('copying an empty array', () => {
    let original = []
    let theCopy = copy(original)
    it('works', () => {
      expect(theCopy.length).toBe(original.length)
    })
    it('does not link the copy to the original', () => {
      theCopy.push('hello')
      expect(theCopy.length).toBe(1)
      expect(original.length).toBe(0)
      original.push('bye')
      expect(theCopy.length).toBe(1)
      expect(theCopy[0]).toBe('hello')
      expect(original.length).toBe(1)
      expect(original[0]).toBe('bye')
    })
  })
  describe('copying an array with a couple items', () => {
    let original = [3, 5, 7]
    let theCopy = copy(original)
    it('works', () => {
      expect(theCopy.length).toBe(original.length)
    })
    it('does not link the copy to the original', () => {
      theCopy.push(9)
      expect(theCopy.length).toBe(4)
      expect(original.length).toBe(3)
      original.push(11)
      expect(theCopy.length).toBe(4)
      expect(theCopy[3]).toBe(9)
      expect(original.length).toBe(4)
      expect(original[3]).toBe(11)
      theCopy.shift()
      expect(theCopy.length).toBe(3)
      expect(theCopy[2]).toBe(9)
      expect(original.length).toBe(4)
      expect(original[3]).toBe(11)
    })
  })
})
