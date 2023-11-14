FROM node:lts
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY dist .
EXPOSE 8100
CMD yarn knex migrate:latest &&\
    yarn knex seed:run &&\
    node server.js
