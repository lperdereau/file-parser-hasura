FROM node:12

WORKDIR /app

COPY . ./

RUN npm i

CMD [ "node", "src/index.js" ]