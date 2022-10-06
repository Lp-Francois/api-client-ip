const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log('request received on /')
  res.send({ healthy: true })
})

app.set('trust proxy', true)

app.get('/ip', (request, response) => {
  const header = request.header('X-Forwarded-For') || null
  console.log(`request received on /ip (${request.ip} ${header})`)
  return response.send({
    'request IP': request.ip,
    'request.socket.remoteAddress': request.socket.remoteAddress,
    'X-Forwarded-For header': header
  })
})

app.listen(port, () => console.log(`app listening on port ${port}`))
