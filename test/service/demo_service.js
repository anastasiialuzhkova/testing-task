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
}
