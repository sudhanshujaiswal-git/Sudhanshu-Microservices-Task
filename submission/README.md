# Docker Microservices Assignment - Sudhanshu

Deployment of 4 microservices (Gateway, User, Product, Order) using Docker Compose with internal networking.

## 🚀 Quick Start

```bash
cd ~/Sudhanshu-Microservices-Task/submission
docker compose up -d
sleep 10
docker compose ps

NAME                           STATUS   PORTS
submission-gateway-service-1   Up       0.0.0.0:3003->3003/tcp
submission-user-service-1      Up       0.0.0.0:3000->3000/tcp  
submission-product-service-1   Up       0.0.0.0:3001->3001/tcp
submission-order-service-1     Up       0.0.0.0:3002->3002/tcp

# All services healthy
curl localhost:3003    # Gateway ✓
curl localhost:3000    # User ✓
curl localhost:3001    # Product ✓  
curl localhost:3002    # Order ✓

# Inter-service communication
docker exec -it submission-gateway-service-1 curl user-service:3000


docker network ls
docker network inspect submission_default_<hash>
