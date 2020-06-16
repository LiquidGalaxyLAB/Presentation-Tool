#!/bin/bash
. ${HOME}/etc/shell.conf

#Closes all xiv from the same lg
for lg in $LG_FRAMES ; do
   echo $lg:
   if [ $lg == "lg1" ]; then
       echo "Master"
	   #kill all proccess from master
       pkill mpv
       pkill feh
       pkill ffplay
   else
       echo "Slave"
	   #kill all proccess from the slaves via ssh
       ssh $lg "pkill mpv; pkill feh; pkill ffplay"
   fi
done
