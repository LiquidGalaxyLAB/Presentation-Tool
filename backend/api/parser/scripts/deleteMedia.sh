#!/bin/bash

# This script is responsible of deleting the media storage from a presentation inside all machines

SLAVEDELETEPATH=$1
MASTERDELETEPATH=$2
MAXSCREENS=$3

for screen in $(seq 1 $MAXSCREENS) ; do
   echo $screen
   if [ $screen == "1" ]; then
       echo "Master"
	   rm -rf $MASTERDELETEPATH
   else
       echo "Slave"
       ssh lg$screen "rm -rf $SLAVEDELETEPATH"
   fi
done