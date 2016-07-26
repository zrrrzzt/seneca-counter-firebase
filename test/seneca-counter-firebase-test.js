'use strict'

const tap = require('tap')
const Seneca = require('seneca')()
const senecaCounter = require('../index')
const senecaCounterOptions = {
  databaseURL: 'https://demo.firebaseio.com'
}

Seneca.use(senecaCounter, senecaCounterOptions)

tap.test('True is True', (test) => {
  tap.equal(true, true)
  test.done()
})
