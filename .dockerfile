FROM node:22-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm run start:dev"]
# CMD ["sh", "-c", "npm run migration:create && npm run migration:run && npm run start:dev"]
