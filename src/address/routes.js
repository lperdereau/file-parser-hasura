const handlers = require('./handlers')
const payloads = require('./payloads')
const validates = require('./validates')

module.exports = {
  csv: {
    method: 'POST',
    path: '/address/csv',
    config: {
      payload: payloads.csv,
      validate: validates.csv,
      handler: handlers.csv
    }
  }
}