FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install -g

RUN npm install

CMD [ "npm", "test" ]