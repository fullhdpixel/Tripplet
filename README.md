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

## Deployment (TODO)

Be sure you change the write queue to 1000
1. Add unstructured to page (page a / b)
2. Deploy to digitalocean