FROM node:lts-slim

# RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Add the node-modules/.bin to path
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependancies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts -g

# add app
COPY . ./

EXPOSE 3000

CMD ["npm", "start"]