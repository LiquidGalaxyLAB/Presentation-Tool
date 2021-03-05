#!/bin/bash

# This script opens a image in a given position in two selected liquid galaxy screens

LEFTSCREEN=$1
RIGHTSCREEN=$2
LEFT_FILE_PATH=$3
RIGHT_FILE_PATH=$4
POSITION=$5

ORIENTATION=$(xrandr --query --verbose | grep -w "connected" | cut -d ' ' -f 6)
DIMENSION_LARGEST=$(xrandr | grep '*' | head -n1 | awk '{print $1}' | cut -d 'x' -f1) # gets the screen dimension of the largest side
DIMENSION_SHORTEST=$(xrandr | grep '*' | head -n1 | awk '{print $1}' | cut -d 'x' -f2) # gets the screen dimension of the shortest side

# check orientation
if [ "$ORIENTATION" = "right" ] || [ "$ORIENTATION" = "left" ] ; then
    # calculates width and height 
    XLEFTPOSITION=$((DIMENSION_SHORTEST / 6))
    XRIGHTPOSITION=0
    WIDTH=$((XLEFTPOSITION * 5))
    HEIGHT=$((DIMENSION_LARGEST / 3))

else
    # calculates width and height
    XLEFTPOSITION=$((DIMENSION_LARGEST / 6))
    XRIGHTPOSITION=0
    WIDTH=$((XLEFTPOSITION * 5))
    HEIGHT=$((DIMENSION_SHORTEST / 3))
fi

if [ "$POSITION" = "top" ]; then
    YPOSITION=0
elif [ "$POSITION" = "center" ]; then
    YPOSITION=$HEIGHT 
elif [ "$POSITION" = "bottom" ]; then
    YPOSITION=$((2*HEIGHT))
else
    YPOSITION=0
fi


# concat the string of size
SIZE="${WIDTH}x${HEIGHT}"
echo "SIZE: $SIZE"

# connect via ssh and execute the action LEFT SCREEN
ssh lg@lg$LEFTSCREEN "export DISPLAY=:0 && feh -x -g $SIZE+$XLEFTPOSITION+$YPOSITION $LEFT_FILE_PATH --zoom fill" & 

# connect via ssh and execute the action RIGHT SCREEN
ssh lg@lg$RIGHTSCREEN "export DISPLAY=:0 && feh -x -g $SIZE+$XRIGHTPOSITION+$YPOSITION $RIGHT_FILE_PATH --zoom fill" & 
