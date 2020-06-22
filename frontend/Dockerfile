FROM node:12
WORKDIR /frontend
COPY package.json /frontend
RUN npm install
RUN chmod a+x /frontend/node_modules/.bin/react-scripts
RUN apt-get update
COPY . /frontend




