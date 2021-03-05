#!/bin/bash

# This is script opens a video in a selected liquid galaxy screen

LG_SCREEN=$1    # the first parameter is the lg screen
FILE_PATH=$2    # the path where the video is located
POSITION=$3     # string thar represents the location in the screen

ORIENTATION=$(xrandr --query --verbose | grep -w "connected" | cut -d ' ' -f 6)
DIMENSION_LARGEST=$(xrandr | grep '*' | head -n1 | awk '{print $1}' | cut -d 'x' -f1) # gets the screen dimension of the largest side
DIMENSION_SHORTEST=$(xrandr | grep '*' | head -n1 | awk '{print $1}' | cut -d 'x' -f2) # gets the screen dimension of the shortest side


echo "LG_SCREEN: $LG_SCREEN"
echo "FILE_PATH: $FILE_PATH"
echo "ORIENTATION: $ORIENTATION"
echo "POSITION: $POSITION"

# to maintain width of the video
if [ "$LG_SCREEN" -eq "1" ]; then
    WIDTH=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=s=x:p=0 $FILE_PATH)
else
    WIDTH=$(ssh lg@lg$LG_SCREEN ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=s=x:p=0 $FILE_PATH)
fi

echo "$WIDTH"

# Checking parameters passed
if [ "$ORIENTATION" = "right" ] || [ "$ORIENTATION" = "left" ] ; then
   # in case image width is bigger than the screen
    if [ "$WIDTH" -gt "$DIMENSION_SHORTEST" ];then
        WIDTH=$DIMENSION_SHORTEST
    fi
    # calculates width and heigh
    XPOSITION=$(((DIMENSION_SHORTEST /2) - (WIDTH/2)))
    HEIGHT=$((DIMENSION_LARGEST / 3))
else
    # in case image width is bigger than the screen
    if [ "$WIDTH" -gt "$DIMENSION_SHORTEST" ];then
        WIDTH=$DIMENSION_SHORTEST
    fi
    # calculates width and height
    XPOSITION=$(((DIMENSION_LARGEST /2) - (WIDTH/2)))
    HEIGHT=$((DIMENSION_SHORTEST / 3))
fi

if [ "$POSITION" = "top" ]; then
    YPOSITION=0
elif [ "$POSITION" = "center" ]; then
    YPOSITION=$HEIGHT
    echo "here"  
elif [ "$POSITION" = "bottom" ]; then
    YPOSITION=$((2*HEIGHT))
else
    YPOSITION=0
fi

SIZE="${WIDTH}x${HEIGHT}"
echo "SIZE: $SIZE"
POSITION="${XPOSITION}+${YPOSITION}"
echo "POSITION: $POSITION"

# check if media file exists
ssh lg@lg$LG_SCREEN [[ -f $FILE_PATH ]] && echo "File exists.. Continue" || exit 1;


# connect via ssh and execute the action
ssh lg@lg$LG_SCREEN "export DISPLAY=:0 && mpv -no-border --no-keepaspect --geometry=$SIZE+$POSITION $FILE_PATH;" & 

