FROM node

# Exclude the NPM cache from the image
VOLUME /root/.npm

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm i

# Bundle app source
COPY . /usr/src/app

# Environment variables
ENV NODE_ENV "production"
ENV PORT 1337

# Compile app source
RUN npm run build

EXPOSE 1337

CMD [ "npm", "run", "start:docker" ]
