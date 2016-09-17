[![Build Status](https://travis-ci.org/zrrrzzt/seneca-counter-firebase.svg?branch=master)](https://travis-ci.org/zrrrzzt/seneca-counter-firebase)
[![Coverage Status](https://coveralls.io/repos/zrrrzzt/seneca-counter-firebase/badge.svg?branch=master&service=github)](https://coveralls.io/github/zrrrzzt/seneca-counter-firebase?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# seneca-counter-firebase
A counter plugin for the [Seneca](http://senecajs.org/) microservices toolkit with a firebase backend.

## Installation

From npm

```sh
$ npm i --save seneca-counter-firebase
```

## Messages handled
### ```role:counter, cmd:add```
Adds a value to the given key. 
Uses ```value``` as key if no key supplied.
Defaults to 1 if no value is presented.
```JavaScript
Seneca.act('role:counter, cmd:add', {key: 'test', value: 2}, (error, data) => {})
```

### ```role:counter, cmd:subtract```
Subtracts a value from the given key. 
Uses ```value``` as key if no key supplied.
Defaults to 1 if no value is presented.
```JavaScript
Seneca.act('role:counter, cmd:subtract', {key: 'test', value: 2}, (error, data) => {})
```

### ```role:counter, cmd:get```
Get the value from a given key. 
Uses ```value``` as key if no key supplied.
```JavaScript
Seneca.act('role:counter, cmd:get', {key: 'test'}, (error, data) => {})
```

## Messages emitted

### None

## Example

If your Firebase database is completely open (rules) you can drop apiKey, authDomain, authEmail and authPassword from your config.

If yoy want restrictions this module supports Firebase's email/password sign-in.

```JavaScript
'use strict'

const Seneca = require('seneca')()
const senecaCounter = require('seneca-counter-firebase')
const senecaCounterOptions = {
  tag: 'seneca-counter-firebase',
  apiKey: '<your-firebase-api-key>',
  authDomain: '<your-firebase-auth-domain>',
  databaseURL: '<your-firebase-database-url>', // Required
  appName: '<your-firebase-app-name>',
  authEmail: '<your-firebase-user-email>',
  authPassword: '<your-firebase-user-password>'
}

Seneca.use(senecaCounter, senecaCounterOptions)

Seneca.listen(1337)

```

### Curl

Call the service to add a value for a given key

```sh
$ curl -d '{"role":"counter", "cmd":"add", "key": "test", "value": 2}' -v http://localhost:1337/act
```

or to subtract a value for a given key

```sh
$ curl -d '{"role":"counter", "cmd":"subtract", "key": "test", "value": 2}' -v http://localhost:1337/act
```

Lookup a key

```sh
$ curl -d '{"role":"counter", "cmd":"get", "key": "test"}' -v http://localhost:1337/act
```

returns

```JavaScript
{success: true, key: 'test', value: 0} 
```

if no key is supplied it will use ```value``` as key

## License

[MIT](LICENSE)
