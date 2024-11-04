const assert = require('assert')
const expect = require('chai').expect
const demo = require('./service/demo_service')

describe('demo', () => {
  describe('ping', () => {
    it('should have pong response', async () => {
      let res = await demo.get('ping')
      const pong = await res.json()

      expect(pong).to.deep.equal({
        status: 'ok',
        text: 'pong',
      })
    })

    it('should have status 200', async () => {
      let res = await demo.get('ping')
      expect(res.status).equal(200)
    })
  })

  describe('users', () => {
    it('should return list of users', async () => {
      const res = await demo.get('users')
      const users = await res.json()
      expect(users.status).to.equal('ok')  
      expect(users.users.length).to.greaterThan(0)
    })
  })
})
