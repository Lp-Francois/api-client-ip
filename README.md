# API Client IP

API to debug the client IP forwarding through load-balancers, ingress, etc thanks to `/ip` endpoint.

```
docker build . -t test

docker run -it -p 3000:3000 test

http://localhost:3000/

http://localhost:3000/ip
```

## deploy on K8s