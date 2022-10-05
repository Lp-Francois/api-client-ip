const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send({ healthy: true }))

app.set('trust proxy', true)

app.get('/ip', (request, response) => {
  return response.send({
    'request IP': request.ip,
    'request.socket.remoteAddress': request.socket.remoteAddress,
    'X-Forwarded-For header': request.header('X-Forwarded-For') || null
  })
})

app.listen(port, () => console.log(`app listening on port ${port}`))
