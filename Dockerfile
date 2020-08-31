FROM node
WORKDIR /usr/src/tssblog
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node","index.js"]
