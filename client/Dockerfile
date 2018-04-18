FROM node:latest
ENV NODE_ENV production
RUN mkdir -p /usr/src/app
RUN mkdir -p /var/www
RUN npm install @vue/cli
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm run build
COPY /usr/src/app/dist/ /var/www/
