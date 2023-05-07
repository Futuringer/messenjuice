FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

RUN npm run build

ENV PORT 3000

EXPOSE $PORT

CMD ["node","server.js"]
