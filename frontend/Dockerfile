
FROM node:alpine


WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@10.4.0

COPY . .


RUN npm run build


RUN npm install -g serve


CMD ["serve", "-s", "build"]

