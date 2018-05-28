Minicube commands

minikube start --vm-driver=xhyve

docker build -t cujoo-node:v1 .

kubectl run cujoo-node --image=cujoo-node:v1 --port=8080

kubectl expose deployment cujoo-node --type=LoadBalancer

minikube service cujoo-node


Usage in example

http://<ip address>:<port>/adjectives/buddy+guy/mustang+sally
