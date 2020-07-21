'use strict'
const http = require('http')
const server = http.createServer(
  (req, res) => {
    setTimeout(() => {
      console.log('timeout expired')
      res.end('hello')
    }, 5000)
  })

const { createTerminus } = require('../../')

createTerminus(server, {
  timeout: 30000,
  onSignal: () => {
    console.log('on-sigterm-runs')
    return Promise.resolve()
  },
  onShutdown: () => {
    console.log('on-shutdown-runs')
  }
})

server.listen(8000, () => {
  http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/'
  }, (res) => {
    console.log('got a response!')
  })
  setTimeout(() => {
    process.kill(process.pid, SIGNAL)
  }, 1500)
})
