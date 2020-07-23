#!/bin/bash

MAXSCREENS=$1
SOURCESTORAGE=$2
DESTSTORAGEMASTER=$3
DESTSTORAGESLAVE=$4

for screen in $(seq 1 $MAXSCREENS) ; do
   echo $screen
   if [ $screen == "1" ]; then
       echo "Master"
	   mkdir $DESTSTORAGEMASTER
       cp $SOURCESTORAGE/temp/lg$screen-media/* $DESTSTORAGEMASTER
   else
       echo "Slave"
       ssh lg$screen "mkdir $DESTSTORAGESLAVE"
       scp $SOURCESTORAGE/temp/lg$screen-media/* lg$screen:$DESTSTORAGESLAVE
   fi
done