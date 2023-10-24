FROM node:19-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
RUN apk add --no-cache g++ build-base
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]