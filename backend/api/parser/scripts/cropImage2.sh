# this script uses imagemagick and is responsible of getting an image, cutting in two and sending them to their correct screens

LEFTSCREEN=$1
RIGHTSCREEN=$2
IMAGEPATH=$3
IMAGENAME=$4
PRESENTATIONID=$5

echo "Left Screen $LEFTSCREEN"
echo "Right Screen $RIGHTSCREEN"
echo "Image path $IMAGEPATH"
echo "Image name $IMAGENAME"
echo "Presentation id $PRESENTATIONID"

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
magick "${IMAGEPATH}" -crop $SIZETOCROP+0+0 "${HOME}/${IMAGENAME}Left.png"

# right side
magick "${IMAGEPATH}" -crop $SIZETOCROP+$IMAGECROPX+0 "${HOME}/${IMAGENAME}Right.png"

# send cropped images to storage in the correct slaves

if [ $LEFTSCREEN != "1" ]; then
	scp ${HOME}/${IMAGENAME}Left.png lg$LEFTSCREEN:${HOME}/storage/${PRESENTATIONID}/
else
	mv ${HOME}/${IMAGENAME}Left.png ${HOME}/storage/${PRESENTATIONID}/
fi

if [ $RIGHTSCREEN != "1" ]; then
	scp ${HOME}/${IMAGENAME}Right.png lg$RIGHTSCREEN:${HOME}/storage/${PRESENTATIONID}/
else
	mv ${HOME}/${IMAGENAME}Right.png ${HOME}/storage/${PRESENTATIONID}/
fi
	

