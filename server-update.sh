#!/bin/sh
git pull
cd client
npm install
npm run build
cd ../server
npm install
killall node
killall nodemon
killall npm
nohup npm run production > iro.out 2> iro.err < /dev/null &
echo "Server is now running silently..."
