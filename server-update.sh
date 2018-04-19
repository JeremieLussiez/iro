#!/bin/sh
git pull
cd client
npm install
npm run build
cd ../server
npm install
NODE_ENV=production
killall node
killall nodemon
npm run dev
