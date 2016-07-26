'use strict'

const tap = require('tap')
const Seneca = require('seneca')()
const senecaCounter = require('../index')
const senecaCounterOptions = {
  databaseURL: 'https://seneca-firebase-test.firebaseio.com'
}

Seneca.use(senecaCounter, senecaCounterOptions)

tap.test('It supports addition', (test) => {
  const payload = {
    role: 'counter',
    cmd: 'add',
    key: 'test',
    value: 2
  }

  Seneca.act(payload, (error, data) => {
    if (error) {
      throw error
    }
    tap.equal(payload.value, data.value, 'Correct value added')
    test.done()
  })
})

tap.test('It supports subtraction', (test) => {
  const payload = {
    role: 'counter',
    cmd: 'subtract',
    key: 'test',
    value: 2
  }

  Seneca.act(payload, (error, data) => {
    if (error) {
      throw error
    }
    tap.equal(payload.value, data.value, 'Correct value subtracted')
    test.done()
  })
})
