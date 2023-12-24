FROM node:21-alpine

RUN mkdir /app && chown node:node /app
WORKDIR /app

USER node
COPY --chown=node:node package.json package-lock.json* ./
# COPY package*.json ./

RUN npm install

# COPY . .
COPY --chown=node:node . .


EXPOSE 8800

CMD ["npm", "start"]