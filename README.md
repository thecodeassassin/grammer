Minicube commands

minikube start --vm-driver=xhyve

docker build -t cujoo-node:v1 .

kubectl run cujoo-node --image=cujoo-node:v1 --port=8080

kubectl expose deployment cujoo-node --type=LoadBalancer

minikube service cujoo-node


Usage in example

http://<ip address>:<port>/adjectives/buddy+guy/mustang+sally

# Improvements

1. It's not advisesable to commit node_modules in your source code repository
2. Complexity can be greatly reduced by using async/await (https://javascript.info/async-await)
3. Keep your docker images small, don't send anything to the docker daemon that you don't have to. Use a .dockerignore file
4. Practise immutable values. See: https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75 and https://wecodetheweb.com/2016/02/12/immutable-javascript-using-es6-and-beyond/
5. Service was not sending proper JSON.
6. Missing Kubernetes configuration
7. /healthz endpoint was not working