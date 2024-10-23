const assert = require('assert')

const url = 'http://localhost:3000'

describe('testing system', () => {
  describe('ping', () => {
    it('should have pong response', async () => {
      let res = await fetch(url + '/ping')
      const body = await res.text()
      assert.equal(body, 'pong')
    })

    it('should have status 200', async () => {
      let res = await fetch(url + '/ping')
      assert.equal(res.status, 200)
    })
  })
})
