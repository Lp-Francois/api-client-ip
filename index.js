const express = require('express')
const app = express()
const port = 3000
const { setTimeout: sleep } = require("node:timers/promises");

console.log("Hello there!");

app.get("/", (req, res) => {
  console.log("request received on /");
  res.send({ healthy: true });
});

const SLEEP_SECONDS = process.env.SLEEP_SECONDS;
console.log(`SLEEP_SECONDS: ${SLEEP_SECONDS}`);

/**
 * To test timeout from load balancers
 */
app.get("/timeout", async (req, res) => {
  console.log(`request received on ${req.url}`);

  let sleepSec = Number(req.query.sleep ?? SLEEP_SECONDS);

  if (sleepSec) {
    console.log(`sleeping for ${sleepSec} seconds`);
    await sleep(sleepSec * 1000);
    console.log("done");
  }
  res.send({ healthy: true });
});

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
