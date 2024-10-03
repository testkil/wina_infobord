# Infoboard

## dev

set the api url in config.js

npm i
npm start

## building for raspberry pi

Building the container for the raspberry pi
`docker buildx build --platform linux/arm64 -t DOCKERHUB_USER/infobord:latest --push .`






