# Fetching the minified node image on apline linux
FROM node:18.3.0-alpine3.15

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /app

COPY package*.json ./
# Installing dependencies
RUN npm install

# Copying all the files in our project
COPY . .

RUN npm run build

# Starting our application
CMD [ "node", "dist/index.js" ]

# Exposing server port
EXPOSE 3002