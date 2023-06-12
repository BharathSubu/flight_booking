FROM node:14 

WORKDIR /usr/src/client

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build 

CMD [ "npm","run" ,"start" ]