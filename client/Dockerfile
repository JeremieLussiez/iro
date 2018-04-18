FROM node:latest
RUN mkdir -p /usr/src/app
RUN mkdir -p /var/www
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
#ENV NODE_ENV production
RUN npm run build
RUN cp -R /usr/src/app/dist/* /var/www/
