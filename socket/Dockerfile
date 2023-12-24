FROM node:21-alpine

WORKDIR /app

USER node

COPY package*.json ./

RUN npm install

COPY . .
# RUN chmod +x /usr/src/app/node_modules/.bin/nodemon


EXPOSE 8800

CMD ["npm", "start"]