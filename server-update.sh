#!bin/sh
killall node
killall nodemon
killall npm
git pull
cd client
npm install
npm run build
cd ../server
npm install
npm run dev
