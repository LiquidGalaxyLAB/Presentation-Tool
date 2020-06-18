#!/bin/bash

# This is script opens an image in a selected liquid galaxy screen

LG_SCREEN=$1    # the first parameter is the lg screen
FILE_PATH=$2    # the path where the image is located
POSITION=$3     # string thar represents the location in the screen

LG_MAX=$(sed "2q;d" ${HOME}/personavars.txt)      # maximum screens this lg has
ORIENTATION=$(xrandr --query --verbose | grep -w "connected" | cut -d ' ' -f 6)
DIMENSION_LARGEST=$(xrandr | grep '*' | head -n1 | awk '{print $1}' | cut -d 'x' -f1) # gets the screen dimension of the largest side
DIMENSION_SHORTEST=$(xrandr | grep '*' | head -n1 | awk '{print $1}' | cut -d 'x' -f2) # gets the screen dimension of the shortest side

echo "LG_SCREEN: $LG_SCREEN"
echo "FILE_PATH: $FILE_PATH"
echo "LG_MAX: $LG_MAX"
echo "ORIENTATION: $ORIENTATION"
echo "POSITION: $POSITION"

# Checking parameters passed

# check orientation
if [ "$ORIENTATION" = "right" ] || [ "$ORIENTATION" = "left" ] ; then
    # calculates width and height
    XPOSITION=$((DIMENSION_SHORTEST / 6))
    YPOSITION=$((DIMENSION_LARGEST / 4))
    WIDTH=$((XPOSITION * 4))
    HEIGHT=$((YPOSITION * 2))
else
    # calculates width and height
    XPOSITION=$((DIMENSION_LARGEST / 6))
    YPOSITION=$((DIMENSION_SHORTEST / 4))
    WIDTH=$((XPOSITION * 4))
    HEIGHT=$((YPOSITION * 2))
fi

# concat the string of size
SIZE="${WIDTH}x${HEIGHT}"
echo "SIZE: $SIZE"

# check if lg screen exists
if [[ $LG_SCREEN -gt 0 ]] && [[ $LG_SCREEN -le $LG_MAX ]] ; then
    echo "Screen is valid"
else
    # if screen passed doesn't exist, always open in the last screen
    echo "Screen passed is invalid. Opening on screen number $LG_MAX"
    LG_SCREEN=$LG_MAX
fi

# check if media file exists
ssh lg@lg$LG_SCREEN [[ -f $FILE_PATH ]] && echo "File exists.. Continue" || exit 1;


# connect via ssh and execute the action
ssh lg@lg$LG_SCREEN "export DISPLAY=:0 && feh -x -g $SIZE+$XPOSITION+$YPOSITION $FILE_PATH --zoom fill" & 
