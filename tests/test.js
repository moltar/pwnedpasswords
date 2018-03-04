const assert = require('assert')
const nockBack = require('nock').back
const pwnedpasswords = require('../')
const path = require('path')

nockBack.fixtures = path.join(__dirname, '/fixtures')
nockBack.setMode('lockdown')

/* global describe, it */
describe('pwnedpasswords', () => {
  describe('promise', () => {
    it('rejects without a password', () => pwnedpasswords()
      .then()
      .catch((err) => {
        assert.equal(err, 'Error: Input password must be a string.')
      }))

    it('rejects with a `null` password', () => pwnedpasswords(null)
      .then()
      .catch((err) => {
        assert.equal(err, 'Error: Input password must be a string.')
      }))

    it('returns correct count for a known password', (done) => {
      nockBack('known_password.json', nockDone => pwnedpasswords('password')
        .then((count) => {
          assert.equal(count, 3303003)
          done()
          nockDone()
        }))
    })

    it('returns zero for an unknown password', (done) => {
      nockBack('unknown_password.json', nockDone => pwnedpasswords('+p5MZhunXrYWF?E&g&X8gxxMhwQsrNzqUS92tSZb=Q?4zgB$')
        .then((count) => {
          assert.equal(count, 0)
          done()
          nockDone()
        }))
    })

    it('rejects when HTTP error occurs', (done) => {
      nockBack('failing_http.json', nockDone => pwnedpasswords('password')
        .then((count) => {
        })
        .catch((err) => {
          assert.equal(err, 'Error: Failed to load pwnedpasswords API: 500')
          done()
          nockDone()
        }))
    })
  })

  describe('callback', () => {
    it('receives error with a `null` password', (done) => {
      pwnedpasswords(null, (err) => {
        assert.equal(err, 'Error: Input password must be a string.')
        done()
      })
    })

    it('receives correct count for a known password', (done) => {
      nockBack('known_password.json', (nockDone) => {
        pwnedpasswords('password', (err, count) => {
          assert.equal(err, null)
          assert.equal(count, 3303003)
          done()
          nockDone()
        })
      })
    })

    it('receives zero for an unknown password', (done) => {
      nockBack('unknown_password.json', (nockDone) => {
        pwnedpasswords('+p5MZhunXrYWF?E&g&X8gxxMhwQsrNzqUS92tSZb=Q?4zgB$', (err, count) => {
          assert.equal(err, null)
          assert.equal(count, 0)
          done()
          nockDone()
        })
      })
    })
  })
})
