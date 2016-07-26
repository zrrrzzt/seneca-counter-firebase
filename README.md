[![Build Status](https://travis-ci.org/zrrrzzt/seneca-counter-firebase.svg?branch=master)](https://travis-ci.org/zrrrzzt/seneca-counter-firebase)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# seneca-counter-firebase
Counter microservice with a firebase backend

Work in progress

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
$ curl -d '{"role":"counter", "cmd":"add", "key": "tfk", "value": 2}' -v http://localhost:1337/act
```

or to subtract

```sh
$ curl -d '{"role":"counter", "cmd":"subtract", "key": "tfk", "value": 2}' -v http://localhost:1337/act
```
