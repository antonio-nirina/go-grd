FROM node:14-slim

WORKDIR /usr/admin/
COPY package*.json ./
RUN npm ci -qy
COPY . .
EXPOSE 3002

CMD ["npm", "start"]
