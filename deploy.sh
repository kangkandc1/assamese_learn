#!/bin/bash
 
set -e  # stop on any error
 
DEPLOY_DIR="/var/www/html/build8/assamese"
APP_DIR="/home/kangkandc1dev/Documents/assamese_learn"
 
echo "==> Pulling latest changes..."
cd "$APP_DIR"
git pull
 
echo "==> Building application..."
npm run build
 
echo "==> Removing old build..."
sudo rm -rf "$DEPLOY_DIR"
 
echo "==> Copying new build..."
sudo cp -r build/ "$DEPLOY_DIR"
 
echo "==> Done! Application deployed to $DEPLOY_DIR"