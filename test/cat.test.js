const expect = require('chai').expect
const cat = require('./service/cat_service')

describe('cat facts', () => {
  describe('random fact', () => {
    it('should have status 200', async () => {
      let res = await cat.get('fact')
      expect(res.status).to.equal(200)
    })

    it('should have correct length', async () => {
      let res = await cat.get('fact')
      let struct = await res.json()

      expect(struct.fact).to.have.length.greaterThan(0)
      expect(struct.length).to.equal(struct.fact.length)
    })
  })
})
