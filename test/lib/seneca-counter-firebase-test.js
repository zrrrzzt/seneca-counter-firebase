'use strict'

const tap = require('tap')
const Seneca = require('seneca')({log: 'silent'})
const senecaCounter = require('../../index')
const senecaCounterOptions = {
  databaseURL: 'https://seneca-firebase-test.firebaseio.com',
  appName: (new Date().getTime() * Math.random()).toString()
}

var counter = 0
const total = 3

const finished = () => {
  counter++
  if (counter === total) {
    tap.end()
    process.exit(0)
  }
}

Seneca.use(senecaCounter, senecaCounterOptions)

tap.test('It supports addition', (childTest) => {
  const payload = {
    key: 'test',
    value: 2
  }

  Seneca.act('role:counter, cmd:add', payload, (error, data) => {
    if (error) {
      throw error
    }
    tap.equal(payload.value, data.value, 'Correct value added')
    childTest.done()
    finished()
  })
})

tap.test('It supports subtraction', (childTest) => {
  const payload = {
    key: 'test',
    value: 2
  }

  Seneca.act('role:counter, cmd:subtract', payload, (error, data) => {
    if (error) {
      throw error
    }
    tap.equal(payload.value, data.value, 'Correct value subtracted')
    childTest.done()
    finished()
  })
})

tap.test('It supports get', (childTest) => {
  const payload = {
    key: 'test'
  }
  Seneca.act('role:counter, cmd:get', payload, (error, data) => {
    if (error) {
      throw error
    }
    const value = data.hasOwnProperty('value')
    tap.equal(payload.key, data.key, 'Correct key looked up')
    tap.ok(value, 'Data has property value')
    childTest.done()
    finished()
  })
})
