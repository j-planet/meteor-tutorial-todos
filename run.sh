#!/usr/bin/env bash

usage ()
{
echo 'Usage: Runs Meteor with MongoDB on the local host (port 27017).'
echo '       parameter 1: name of the MongoDB database'
echo '       parameter 2: port on which to run Meteor'
exit
}

if [ "$1" = "-v" ]; then
usage
else
MONGO_URL=mongodb://localhost:27017/$1 meteor --port $2 run
fi

