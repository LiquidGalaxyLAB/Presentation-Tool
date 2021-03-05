# this script uses imagemagick and is responsible of getting an image, cutting in two and sending them to their correct screens

LEFTSCREEN=$1
RIGHTSCREEN=$2
IMAGEPATH=$3
IMAGENAME=$4
LEFTDESTINATION=$5
RIGHTDESTINATION=$6

echo "Left Screen $LEFTSCREEN"
echo "Right Screen $RIGHTSCREEN"
echo "Image path $IMAGEPATH"
echo "Image name $IMAGENAME"
echo "Left destination $LEFTDESTINATION"
echo "Right destination $RIGHTDESTINATION"

# find out the size of the image
IMAGEWIDTH=$(identify -format "%w" $IMAGEPATH)
IMAGEHEIGHT=$(identify -format "%h" $IMAGEPATH)
echo "Image width $IMAGEWIDTH"
echo "Image height $IMAGEHEIGHT"


# define x to be cropped by cutting image in half
IMAGECROPX=$((IMAGEWIDTH/2))
echo "Image crop $IMAGECROPX"

# concat values to prepare the crop size
SIZETOCROP="${IMAGECROPX}x${IMAGEHEIGHT}"


# left side
convert "${IMAGEPATH}" -crop $SIZETOCROP+0+0 "${HOME}/Left${IMAGENAME}"

# right side
convert "${IMAGEPATH}" -crop $SIZETOCROP+$IMAGECROPX+0 "${HOME}/Right${IMAGENAME}"

# send cropped images to storage in the correct slaves

if [ $LEFTSCREEN != "1" ]; then
	scp ${HOME}/Left${IMAGENAME} lg${LEFTSCREEN}:${LEFTDESTINATION}/
	rm ${HOME}/Left${IMAGENAME}
else
	cp ${HOME}/"Left${IMAGENAME}" $LEFTDESTINATION/
	rm ${HOME}/Left${IMAGENAME}
fi

if [ $RIGHTSCREEN != "1" ]; then
	scp ${HOME}/Right${IMAGENAME} lg${RIGHTSCREEN}:${RIGHTDESTINATION}/
	rm ${HOME}/Right${IMAGENAME}
else
	cp ${HOME}/"Right${IMAGENAME}" "$RIGHTDESTINATION/"
	rm ${HOME}/Right${IMAGENAME}
fi
	

