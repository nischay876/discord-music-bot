FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install pm2 -g

COPY . .

EXPOSE 80

CMD ["pm2-runtime","ecosystem.config.js"]