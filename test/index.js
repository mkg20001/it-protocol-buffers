'use strict'

/* eslint-env mocha */

const assert = require('assert').strict

const pStream = require('..')
const pStreamIT = require('../it')

const pipe = require('it-pipe')

const pb = require('protocol-buffers')
const testmsg = pb('message Test { string content = 1 ; }').Test
const testdata = ['hello', 'world', 'randomnonsense⅜£¤⅜£ŁŦŁŊẞ€Ŋ', 'hello world!!!1'].map(content => {
  return {
    content
  }
})

describe('it-protocol-buffers', () => {
  describe('lp', () => {
    it('should decode and encode', async () => {
      const res = []

      await pipe(
        testdata,
        pStream.encode(testmsg),
        pStream.decode(testmsg),
        async source => {
          for await (const chunk of source) {
            res.push(chunk.slice()) // (.slice converts BufferList to Buffer)
          }
        }
      )

      assert.deepEqual(res, testdata, 'invalid data returned')
    })
  })

  const outdata = [testmsg.encode(testdata[3])]

  describe('single', () => {
    it('should encode a single element', async () => {
      const res = []

      await pipe(
        testdata,
        pStreamIT.encode(testmsg),
        async source => {
          for await (const chunk of source) {
            res.push(chunk.slice()) // (.slice converts BufferList to Buffer)
          }
        }
      )

      assert.deepEqual(res, outdata, 'invalid data returned')
    })

    it('should decode a single element', async () => {
      const res = []

      await pipe(
        outdata.slice(3),
        pStreamIT.decode(testmsg),
        async source => {
          for await (const chunk of source) {
            res.push(chunk.slice()) // (.slice converts BufferList to Buffer)
          }
        }
      )

      assert.deepEqual(res, testdata.slice(3), 'invalid data returned')
    })
  })
})
