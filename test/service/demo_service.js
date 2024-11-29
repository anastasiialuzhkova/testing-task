require('dotenv').config()

module.exports = {
  url: process.env.DEMO_URL,

  get: function (path) {
    return fetch(`${this.url}/${path}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    })
  },

  post: function (path, body) {
    return fetch(`${this.url}/${path}`, {
      method: 'POST',
      body: body,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
  },
}
