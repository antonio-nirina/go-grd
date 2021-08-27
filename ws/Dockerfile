FROM node:14-slim
RUN apt-get update && apt-get install -y git
WORKDIR /src/ws
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 8080

CMD ["npm", "start"]
