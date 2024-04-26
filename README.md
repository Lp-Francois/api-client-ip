# API Client IP

API to debug the client IP forwarding through load-balancers, ingress, etc. Very useful to check if the client IP is passed in order to achieve _rate-limiting_ with your application.

It can also debug timeout, with passing the `SLEEP_SECONDS` environment variable. Ping `/timeout` endpoint to simulate a long request.

## Getting started - Deploy on K8s

```sh
export HOST_INGRESS=api.myhost.com
export DOCKER_IMAGE=francoisaster/api-client-ip:latest

envsubst < deploy/deployment.yaml > deploy/output.yaml   
kubectl apply -f deploy/output.yaml

# on mac
open http://$HOST_INGRESS/ip
```

On the `/ip` endpoint, basic client information are diplayed allowing you to debug IP forwarding.

```json
{
  "request IP": "79.1.68.92",
  "request.socket.remoteAddress": "::ffff:10.204.11.81",
  "X-Forwarded-For header": "79.1.68.92"
}
```

## Local development

```sh
docker build . -t test

docker run -it -p 3000:3000 test

http://localhost:3000/

http://localhost:3000/ip
```
