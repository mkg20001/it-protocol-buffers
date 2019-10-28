'use strict'

const pipe = require('it-pipe')
const lp = require('it-length-prefixed')
const it = require('./it')

module.exports.encode = (proto) => {
  return pipe(
    it.encode(proto),
    lp.encode()
  )
}

module.exports.decode = (proto) => {
  return pipe(
    lp.decode(),
    it.decode(proto)
  )
}

module.exports.it = it
