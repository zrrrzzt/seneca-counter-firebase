'use strict'

module.exports = function firebaseCounter (options) {
  const firebase = require('firebase')
  const app = firebase.initializeApp({
    apiKey: options.apiKey,
    authDomain: options.authDomain,
    databaseURL: options.databaseURL
  }, options.appName)

  if (options.authEmail && options.authPassword) {
    app.auth().signInWithEmailAndPassword(options.authEmail, options.authPassword).catch(error => {
      return error
    })
  }

  const database = app.database()
  const seneca = this

  seneca.add('role:counter, cmd:add', (args, done) => {
    const value = parseInt(args.value || 1, 10)
    const valueRef = database.ref(args.key || 'value')
    valueRef.transaction((currentVal) => {
      return currentVal + value
    })
    done(null, {success: true, value: value})
  })

  seneca.add('role:counter, cmd:subtract', (args, done) => {
    const value = parseInt(args.value || 1, 10)
    const valueRef = database.ref(args.key || 'value')
    valueRef.transaction((currentVal) => {
      return currentVal - value
    })
    done(null, {success: true, value: value})
  })

  seneca.add('role:counter, cmd:get', (args, done) => {
    const selectedKey = args.key || 'value'

    database.ref(selectedKey).once('value').then(snapshot => {
      const value = snapshot.val()
      done(null, {success: true, key: selectedKey, value: value})
    })
  })

  return options.tag || 'seneca-counter-firebase'
}
