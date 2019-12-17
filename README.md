# Information Retrieval 

## Prerequisites
1. Elastic search
2. NodeJS

## Starting the project
1. Start elastic search 

`./bin/elasticsearch`

2. Start the node js app

`yarn start`
`yarn watch-ts`

## Creating the database

mkdir -p ~/data/db

mongod --dbpath ~/data/db

## Start mongodb on server
mongod --fork --dbpath ~/data/db --syslog

## Deployment (TODO)
1. Deploy to digitalocean

192.81.223.34
192.81.223.34:4000
sudo systemctl start elasticsearch.service
sudo nano /etc/elasticsearch/elasticsearch.yml

sudo chmod -R 757 /usr/share/elasticsearch/