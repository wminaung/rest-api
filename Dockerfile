FROM node:20-alpine , postgres:17-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
