#!/bin/bash

# This script is responsible of deleting the media storage from a presentation inside all machines

SLAVEDELETEPATH=$1
MASTERDELETEPATH=$2
. ${HOME}/etc/shell.conf

for lg in $LG_FRAMES ; do
   echo $lg:
   if [ $lg == "lg1" ]; then
       echo "Master"
	   rm -rf $MASTERDELETEPATH
   else
       echo "Slave"
       ssh $lg "rm -rf $SLAVEDELETEPATH"
   fi
done