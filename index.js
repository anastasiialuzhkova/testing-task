const express = require('express')
var bodyParser = require('body-parser')

const app = express()
// parse application/json
app.use(bodyParser.json())

const port = 3000

let users = [
  {
    id: 1,
    name: 'John',
    balance: 100.0,
  },
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', (req, res) => {
  res.send(users)
})

app.get('/users/:id', (req, res) => {
  const id = req.params.id
  const idx = id - 1
  if (idx in users) {
    res.send({ user: users[idx] })
  } else {
    res.status(404)
    res.send({status: 'not found'})
  }
})

app.post('/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    balance: 0.0,
  }
  users.push(user)
  res.send({ status: 'ok', user: user })
})

app.post('/users/:id/buy/:price', (req, res) => {
  const id = parseInt(req.params.id)
  const idx = id - 1
  if ( !(idx in users)) {
    res.send('user not found')
    return
  }
  const user = users[idx]
  const price = parseFloat(req.params.price)
  if (user.balance < price) {
    res.send('not enough money')
    return
  }
  user.balance -= price
  res.send({
    status: 'ok',
    user: user
  })
})

app.post('/users/:id/faucet/:amount', (req, res) => {
  const id = parseInt(req.params.id)
  const idx = id - 1
  if ( !(idx in users)) {
    res.send('user not found')
    return
  }
  const user = users[idx]
  const amount = parseFloat(req.params.amount)
  
  user.balance += amount
  res.send({
    status: 'ok',
    user: user
  })
})

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
