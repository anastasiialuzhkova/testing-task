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

  describe('Get list of users', () => {
    it('should return list of users', async () => {
      const res = await demo.get('users')
      const users = await res.json()
      expect(users.status).to.equal('ok')
      expect(res.status).equal(200)
      expect(users.users.length).to.greaterThan(0)
     
    })
  })

  let id;
  
  describe('New user registration', () => {
    it('create new user', async () => {
      const res = await demo.post('users', JSON.stringify({ name: 'Masha' }))
      const response = await res.json()
      expect(res.status).equal(200)
      expect(response.status).to.equal('ok')
      expect(response.user.id).to.greaterThan(0)
      expect(response.user.balance).to.equal(0.0)
      expect(response.user.name).to.equal('Masha')
      id = response.user.id
    })
  })

  describe('Get user by id', () => {
    it('should return user', async () => {
      const res = await demo.get('users/'+ id)
      const response = await res.json()
      expect(res.status).equal(200)
      expect(response.user.id).to.greaterThan(0)
      expect(response.user.balance).to.equal(0.0)
      expect(response.user.name).to.equal('Masha')
    })
  })

  
  describe('Get user by non-existent id', () => {
    it('should return 404', async () => {
      const res = await demo.get('users/-1')
      const user = await res.json()
      expect(res.status).equal(404)
      expect(user.status).equal('not found')
    })
  })

  describe('Give money to user', () => {
    it('should ballance ', async () => {
      const res = await demo.post('users/' + id + '/faucet/50')
      const response = await res.json()
      expect(res.status).equal(200)
      expect(response.status).to.equal('ok')
      expect(response.user.id).to.greaterThan(0)
      expect(response.user.balance).to.equal(50.0)
      expect(response.user.name).to.equal('Masha')
    })
  })

  describe('Give money to a non-existens user', () => {
    it('user not found ', async () => {
      const res = await demo.post('users/-1/faucet/50')
      const response = await res.json()
      //expect(res.status).equal() it would be better to return non-200 status code
      expect(response.status).to.equal('error')
      expect(response.text).to.equal('user not found')
      
    })
  })

  describe('The user makes a purchase', () => {
    it('balance updates correctly', async () => {
      const res = await demo.post('users/' + id + '/buy/10')
      const response = await res.json()
      expect(res.status).equal(200)
      expect(response.status).to.equal('ok')
      expect(response.user.id).to.greaterThan(0)
      expect(response.user.balance).to.equal(40.0)
      expect(response.user.name).to.equal('Masha')
    })
  })

  describe('The user makes a purchase with not enough money in the account', () => {
    it('not enough money', async () => {
      const res = await demo.post('users/' + id + '/buy/41')
      const response = await res.json()
      //expect(res.status).equal() it would be better to return non-200 status code
      expect(response.status).to.equal('error')
      expect(response.text).to.equal('not enough money')
      
    })
  })

  describe('Non-existent user make an a purchase', () => {
    it('not enough money', async () => {
      const res = await demo.post('users/-1/buy/41')
      const response = await res.json()
      //expect(res.status).equal() it would be better to return non-200 status code
      expect(response.status).to.equal('error')
      expect(response.text).to.equal('user not found')
      
    })
  })
})
