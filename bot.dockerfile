FROM node:23.5

WORKDIR /bot

COPY . .

RUN npm install

CMD [ "node", "index.js"]