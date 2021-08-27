FROM node:14-slim
RUN apt-get update && apt-get install -y git
WORKDIR /usr/src
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 3000

CMD ["npm", "start"]
