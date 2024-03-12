# Fetching the minified node image on apline linux
FROM node:slim

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR ./usr/src/app

COPY package*.json ./
# Installing dependencies
RUN npm install

# Copying all the files in our project
COPY . .



# Starting our application
CMD [ "node", "index.ts" ]

# Exposing server port
EXPOSE 5000