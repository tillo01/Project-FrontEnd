#!/bin/bash

#PRODUCTION
# git reset --hard
# git checkout master
# git pull origin master

npm i yarn -g
yarn global add serve 
yarn 
yarn run build
pm2 start "yarn run start:prod" --name=Chic-Aura-React

#DEVELOPMENT

# git reset --hard
# git checkout develop 
# git pull origin develop
#hie


# npm i 
# pm2 start "npm run start:dev" --name=Chic-Aura
