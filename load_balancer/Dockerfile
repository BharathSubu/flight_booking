FROM node:14 

WORKDIR /usr/src/load_balancer

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]