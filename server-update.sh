#!/bin/sh
git pull
cd client
npm install
npm run build
cd ../server
npm install
pkill -f node
pkill -f nodemon
pkill -f npm
nohup npm run production > iro.out 2> iro.err < /dev/null &
echo "Server is now running silently..."
