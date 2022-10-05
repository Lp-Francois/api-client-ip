# API Client IP

API to debug the client IP forwarding through load-balancers, ingress, etc thanks to `/ip` endpoint.

```sh
docker build . -t test

docker run -it -p 3000:3000 test

http://localhost:3000/

http://localhost:3000/ip
```

## deploy on K8s

```sh
export HOST_INGRESS=api.myhost.com
envsubst < deploy/deployment.yaml > deploy/output.yaml   
kubectl apply -f deploy/output.yaml
```