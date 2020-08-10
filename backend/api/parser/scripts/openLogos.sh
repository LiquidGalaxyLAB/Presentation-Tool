#!/bin/bash

SCREEN=$1
ORIGIN=$2
DESTINATION=$3
FILE_NAME=$4

echo "screen $SCREEN"
echo "origin $ORIGIN"
echo "dest $DESTINATION"

# sends file to desired screen
scp $ORIGIN lg$SCREEN:$DESTINATION

# open logo
ssh lg$SCREEN "export DISPLAY=:0;feh -x -g 400x400 $DESTINATION/$FILE_NAME"
