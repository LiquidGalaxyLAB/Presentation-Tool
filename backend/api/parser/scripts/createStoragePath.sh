#!/bin/bash

FILENAME=$1
SCREEN=$2
CURRENTPATH=$3
DESTINATIONPATH=$4

echo "FILENAME $FILENAME"
echo "SCREEN $SCREEN"
echo "CURRENTPATH $CURRENTPATH"
echo "DESTINATIONPATH $DESTINATIONPATH"

if [ $SCREEN == "1" ]; then
    # for screen 1
    # create directory if it doesn't exists
    if [ ! -d $DESTINATIONPATH ]; then
        mkdir $DESTINATIONPATH
    fi 

    # copy files from general storage to specific one
    cp $CURRENTPATH/$FILENAME $DESTINATIONPATH
else
    # for other screens
    # create directory if it doesn't exists
    ssh lg$SCREEN "if [ ! -d $DESTINATIONPATH ]; then 
    mkdir $DESTINATIONPATH 
    fi"

    # copy files from general storage to specific one
    scp $CURRENTPATH/$FILENAME lg$SCREEN:$DESTINATIONPATH
fi