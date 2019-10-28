'use strict'

const BufferList = require('bl/BufferList')

module.exports.encode = (proto) => {
  return source => (async function * () {
    for await (const msg of source) {
      yield new BufferList().append(proto.encode(msg))
    }
  })()
}

module.exports.decode = (proto) => {
  return source => (async function * () {
    for await (const msg of source) {
      yield new BufferList().append(proto.decode(msg))
    }
  })()
}
