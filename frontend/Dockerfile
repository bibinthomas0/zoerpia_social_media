
FROM node:alpine


WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@10.4.0

COPY . .


RUN npm run build


RUN npm install -g serve


EXPOSE 5000


CMD ["serve", "-s", "build","start"]

