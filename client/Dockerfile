FROM node:latest
ENV NODE_ENV production
RUN mkdir -p /usr/src/app
RUN mkdir -p /var/www
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
RUN npm install @vue/cli
RUN npm install @vue/cli-service
COPY . /usr/src/app
RUN npm run build
COPY /usr/src/app/dist/ /var/www/
