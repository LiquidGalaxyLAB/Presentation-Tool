#!/bin/bash

MAXSCREENS=$1
SOURCEPATH=$2
DESTPATH=$3

for screen in $(seq 1 $MAXSCREENS) ; do
   echo $screen
   if [ $screen != "1" ]; then
       mkdir $DESTPATH/$screen-media
       scp lg$screen:$SOURCEPATH/* $DESTPATH/$screen-media
   fi
done