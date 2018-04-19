#!/bin/sh
killall node
killall nodemon
killall npm
git pull
cd client
npm install
npm run build
cd ../server
npm install
NODE_ENV=production
npm run dev &
