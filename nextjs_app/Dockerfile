FROM node:20-alpine AS builder

WORKDIR nextjs_app

COPY package*.json .
RUN npm install

COPY . .