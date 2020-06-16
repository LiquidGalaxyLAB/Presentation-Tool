#!/bin/bash

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
	   #kill all proccess from the slaves via ssh
       ssh $lg "rm -rf $SLAVEDELETEPATH"
   fi
done