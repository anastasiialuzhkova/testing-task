
const assert = require('assert')

describe('dumb', () => {
  describe('value 1', () => {
    it('should be equal to 1', () => {
      assert.strictEqual(1, 1)
    })
  })

  describe('value true', () => {
    it('should be equal to true', () => {
      assert.strictEqual(true, true)
    })
  })

})
