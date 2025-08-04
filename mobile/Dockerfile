FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install -g expo-cli && yarn install || npm install
COPY . .
CMD ["npx", "expo", "start", "--tunnel"]
