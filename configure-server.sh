#!/bin/sh
apt-get update && apt-get upgrade -y
apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
apt-get install -y build-essential
apt-get install -y mongodb
apt-get install -y git
apt-get install -y psmisc
apt-get install -y certbot
systemctl start mongodb
