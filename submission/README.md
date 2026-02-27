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



***STEPS***

Step1-

created Ec2 instance < connected to ubuntu terminal < 


installed docker in terminal-

Command-

sudo apt update && sudo apt upgrade -y
sudo apt install -y git docker.io docker-compose-v2
sudo usermod -aG docker ubuntu
newgrp docker  

> checked version-
docker --version && docker compose version

>cloned fork

cd ~
git clone https://github.com/sudhanshujaiswal-git/Sudhanshu-Microservices-Task.git
cd Sudhanshu-Microservices-Task
mkdir -p submission/{user-service,product-service,gateway-service}
ls -la  



>created dockerfile-

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]


Create Dockerfiles -

cd submission

# User Service Dockerfile
cat > user-service/Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
EOF

# Product Service Dockerfile  
cat > product-service/Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
EOF

# Gateway Service Dockerfile
cat > gateway-service/Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3003
CMD ["node", "server.js"]
EOF


Create Sample package.json



cat > user-service/package.json << 'EOF'
{
  "name": "user-service",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
EOF

cp user-service/package.json product-service/
cp user-service/package.json gateway-service/

	 Create sample server.js for testing
cat > user-service/server.js << 'EOF'
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('User Service running on port 3000'));
app.listen(3000, () => console.log('User Service on port 3000'));
EOF

sed 's/3000/3001/g; s/User/Product/' user-service/server.js > product-service/server.js
sed 's/3000/3003/g; s/User/Gateway/' user-service/server.js > gateway-service/server.js


 Create docker-compose.yml - 

cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  user-service:
    build: ./user-service
    ports:
      - "3000:3000"
    networks:
      - microservices-net
    restart: unless-stopped

  product-service:
    build: ./product-service
    ports:
      - "3001:3001"
    networks:
      - microservices-net
    restart: unless-stopped

  gateway-service:
    build: ./gateway-service
    ports:
      - "3003:3003"
    depends_on:
      - user-service
      - product-service
    networks:
      - microservices-net
    restart: unless-stopped

networks:
  microservices-net:
    driver: bridge
EOF

>Test Everything -

docker compose up --build

cd ~/Sudhanshu-Microservices-Task/submission

> Fixed gateway Dockerfile -
cat > gateway-service/Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3003
CMD ["node", "server.js"]
EOF

Fix docker-compose.yml-

cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  user-service:
    build: ./user-service
    ports:
      - "3000:3000"
    networks:
      - microservices-net
    restart: unless-stopped

  product-service:
    build: ./product-service
    ports:
      - "3001:3001"
    networks:
      - microservices-net
    restart: unless-stopped

  gateway-service:
    build: ./gateway-service
    ports:
      - "3003:3003"
    depends_on:
      - user-service
      - product-service
    networks:
      - microservices-net
    restart: unless-stopped

networks:
  microservices-net:
    driver: bridge
EOF

Verify -
ls -la submission/
ls -la submission/user-service/
ls -la submission/product-service/ 
ls -la submission/gateway-service/

 
<img width="961" height="445" alt="image" src="https://github.com/user-attachments/assets/3efb03a6-108b-44d0-963f-9e2250ced544" />

<img width="975" height="458" alt="image" src="https://github.com/user-attachments/assets/e0813f7e-2eac-4825-b1b9-3d8e29e54b06" />

 

	Sudo docker compose up --build

 <img width="975" height="453" alt="image" src="https://github.com/user-attachments/assets/2c8bda83-190f-4d62-a6b3-be3123b22bcf" />


	1 error was there- 

<img width="975" height="617" alt="image" src="https://github.com/user-attachments/assets/b323ca43-0fd5-4f21-b9b7-254160e36f1f" />
 
Fixing error –
 
<img width="975" height="468" alt="image" src="https://github.com/user-attachments/assets/07f5f6f4-e249-4c26-8997-bb644d15872d" />

	
Update docker-compose.yml (add order-service)
 
<img width="975" height="509" alt="image" src="https://github.com/user-attachments/assets/611afe91-e58e-472b-827b-3beb76d2d62d" />


Run test-

sudo docker compose up --build
 
<img width="975" height="671" alt="image" src="https://github.com/user-attachments/assets/35f1a8a4-9fec-4116-b469-fd5a7e94e147" />









In new terminal -

In submission folder
Docker ps
 
<img width="975" height="403" alt="image" src="https://github.com/user-attachments/assets/60e9918a-677b-40a3-a5f1-f67c3a0eda83" />

Port 3003 is running -

<img width="975" height="86" alt="image" src="https://github.com/user-attachments/assets/0b7e5085-61e4-4115-9279-b806ac5581bf" />
 


Pushed into git repo successfully

https://github.com/sudhanshujaiswal-git/Sudhanshu-Microservices-Task

