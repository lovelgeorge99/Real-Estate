FROM node:21-alpine


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

RUN npm install -g serve

EXPOSE 5173


CMD ["npm","run","dev"]
# CMD [ "serve","-n", "-s","build","-l","5173" ]