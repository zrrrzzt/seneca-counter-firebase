[![Build Status](https://travis-ci.org/zrrrzzt/seneca-counter-firebase.svg?branch=master)](https://travis-ci.org/zrrrzzt/seneca-counter-firebase)
[![Coverage Status](https://coveralls.io/repos/zrrrzzt/seneca-counter-firebase/badge.svg?branch=master&service=github)](https://coveralls.io/github/zrrrzzt/seneca-counter-firebase?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# seneca-counter-firebase
Counter microservice with a firebase backend

## Work in progress!

## Usage

Start service

```javascript
'use strict'

const Seneca = require('seneca')()
const senecaCounter = require('seneca-counter-firebase')
const senecaCounterOptions = {
  tag: 'seneca-counter-firebase',
  apiKey: '<your-firebase-api-key>',
  authDomain: '<your-firebase-auth-domain>',
  databaseURL: '<your-firebase-database-url>',
  storageBucket: '<your-firebase-storage-bucket>'
}

Seneca.use(senecaCounter, senecaCounterOptions)

Seneca.listen(1337)

```

call the service to add a value for a given key

```sh
$ curl -d '{"role":"counter", "cmd":"add", "key": "test", "value": 2}' -v http://localhost:1337/act
```

or to subtract`a value for a given key
``
```sh
$ curl -d '{"role":"counter", "cmd":"subtract", "key": "test", "value": 2}' -v http://localhost:1337/act
```

Lookup a key
``
```sh
$ curl -d '{"role":"counter", "cmd":"get", "key": "test"}' -v http://localhost:1337/act
```

returns

```javascript
{success: true, key: 'test', value: 0} 
```

if no key is supplied it will use ```value``` as key

## Patterns handled
### ```role:counter,cmd:add```

```javascript
Seneca.act('role:counter, cmd:add', {key: 'test', value: 2}, (error, data) => {})
```

### ```role:counter,cmd:subtract```

```javascript
Seneca.act('role:counter, cmd:subtract', {key: 'test', value: 2}, (error, data) => {})
```

### ```role:counter,cmd:get```

```javascript
Seneca.act('role:counter, cmd:get', {key: 'test'}, (error, data) => {})
```

