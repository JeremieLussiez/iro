FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
#ENV NODE_ENV production
RUN npm run build
VOLUME /var/www /var/www
RUN cp -R ./dist/* /var/www/
