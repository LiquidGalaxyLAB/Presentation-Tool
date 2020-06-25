#!/bin/bash

### DISCLAIMER: NOT IMPLEMENTED ###

# This script opens a video in two selected screens at the same time

LEFTSCREEN=$1
RIGHTSCREEN=$2	    
WIDTH=$3	
HEIGHT=$4	
XPOSITION=$5    
YPOSITION=$6	
FILE_PATH=$7


# OFFSET CALCULATION TESTS
##########################################################
# calculate offset by getting the video width and divide it by two

#VIDEOWIDTH=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of default=nw=1:nk=1 $FILE_PATH) 
#echo "VIDEO WIDTH $VIDEOWIDTH"

# divide video width by two
#OFFSET=$(echo "scale=4; $VIDEOWIDTH/2" | bc)
#echo "Video divided by two $OFFSET"

# normalize value to fit the -3 to +3 
#NORMALIZE=$(echo "scale=4; ($OFFSET+3)/6" | bc)
#echo "Normalized scale $NORMALIZE"

# Discover scaling unit
#if [ $VIDEOWIDTH -gt '1000' ]; then
#	SCALE=0.001
#elif [ $VIDEOWIDTH -gt '100' ]	

#OFFSET=$(echo "scale=4; 0.001*$NORMALIZE" | bc)

#echo "offset $OFFSET"

##########################################################

# ffprobe is a tool from ffmpeg
#if orientation of video is vertical offset = 1 else offset = 0.5
VIDEOWIDTH=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of default=nw=1:nk=1 $FILE_PATH)

VIDEOHEIGHT=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of default=nw=1:nk=1 $FILE_PATH)

VIDEOROTATE=$(ffprobe -loglevel error -select_streams v:0 -show_entries stream_tags=rotate -of default=nw=1:nk=1 $FILE_PATH)
 
echo "VIDEO WIDTH $VIDEOWIDTH"
echo "VIDEO HEIGHT $VIDEOHEIGHT"

if [ $VIDEOHEIGHT -gt $VIDEOWIDTH ]; then
	echo "vertical"
	echo "still has to figure this out"
	OFFSET=1
else
	if [ $VIDEOROTATE -eq '90' ]; then
		echo "this video is rotated"
		echo "vertical"
		echo "still has to figure this out"
		OFFSET=1
	else
		echo "landscape or square"
		OFFSET=0.5
	fi
fi


# concat strings to correctly be placed on command call
SIZE="${WIDTH}x${HEIGHT}"
POSITIONLEFT="${XPOSITION}%+${YPOSITION}%"
POSITIONRIGHT="0%+${YPOSITION}%"


# connect via ssh and execute the action
ssh lg@lg$LEFTSCREEN "export DISPLAY=:0 && mpv --video-pan-x $OFFSET -no-border --autofit=$SIZE --geometry +$POSITIONLEFT $FILE_PATH;" & 

ssh lg@lg$RIGHTSCREEN "export DISPLAY=:0 && mpv --video-pan-x -$OFFSET -no-border --autofit=$SIZE --geometry +$POSITIONRIGHT $FILE_PATH;" & 


