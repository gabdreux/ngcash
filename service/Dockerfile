FROM node:12.16.3-slim

WORKDIR /usr/src/ServiceNGCashapp

COPY package*.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
# COPY service.js ./
# COPY ormconfig.json ./dist/
# COPY .env ./dist/

RUN npm install

COPY . .

RUN npm run build

WORKDIR /./dist

EXPOSE 3000


CMD ["npm", "run start"]