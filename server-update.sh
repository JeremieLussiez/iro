#!/bin/sh
git pull
cd client
npm install
npm run build
cd ../server
npm install
export NODE_ENV=production
echo $NODE_ENV
killall node
killall nodemon
npm run production
