FROM node:21-alpine


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

# RUN npm install -g serve

EXPOSE 4173


CMD ["npm","run","preview"]
# CMD [ "serve","-n", "-s","build","-l","5173" ]