FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV CHOKIDAR_USEPOLLING=true

EXPOSE 3000
CMD npm run dev -- -p 3000