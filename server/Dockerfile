# Use official Node.js LTS image
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 5000

CMD [ "node", "server.js" ]
