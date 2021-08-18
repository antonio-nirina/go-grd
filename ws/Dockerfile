FROM node:14-slim

WORKDIR /src/ws
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 8080

CMD ["npm", "start"]
