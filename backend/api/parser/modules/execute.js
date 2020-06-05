const { exec } = require('child_process')
var fs = require('fs')

module.exports = {
    execPresentation: async function (presentationJson) {
        // if presentation has an audio that will be played the whole time
        if ('audiopath' in presentationJson) {
            //execAudio(presentationJson.audiopath)
        }

        // iterates the slides
        for (var i = 0; i < presentationJson.slides.length; i++) {
            execSlide(presentationJson.slides[i])
            //await sleep(presentationJson.slides[i].duration).then(() => killSlide(presentationJson.slides[i]))
            await sleep(120000).then(() => killSlide(presentationJson.slides[i]))
        }
    },

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function killSlide(slide) {
    // kill slide when time is off
}

function execSlide(slide) {
    if ('flyto' in slide) {
        //flyTo(slide.flyto)
    }
    if ('audiopath' in slide) {
        //execAudio(slide.audiopath)
    }

    slide.screens.forEach(screen => {
        screen.media.forEach(m => {
            if ('type' in m) {
                if (m.type == 'image') {
                    openImage(m, screen.screennumber)
                }
                else if (m.type = 'video') {
                    openVideo(m, screen.screennumber)
                }
            }

        });
    })



}
function execAudio(audiopath) {
    console.log('AUDIOPATH', audiopath)
    exec(`${process.env.FILE_PATH}/api/parser/scripts/playAudio.sh ${process.env.FILE_PATH}/storage/"${audiopath}"`, (err, stdout, stderr) => {
        // BUG = EXEC HAS A MAX BUFFER LIMIT, WHEN ACHIEVES IT, STOPS EXECUTION 
        // putting on background doesn't work, possible solution: increase buffer size 
        if (err) {
            //some err occurred
            console.error(err)
        } else {
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        }
    })

}
async function openImage(media, screen) {
    //console.log('img media/screen', media, screen)

    // bug -> this is ending before the promise inside calculatePosition
    var position = await calculatePosition(media.position)
    position.then(() => {
        console.log('pos', position)
    })

    var file_path
    if (screen == 1) {
        file_path = `${process.env.FILE_PATH}/storage`
    }
    else {
        file_path = `${process.env.SLAVE_STORAGE}`
    }

    /* exec(`${process.env.FILE_PATH}/api/parser/scripts/openImage.sh ${screen} ${file_path}/"${media.storagepath}"/"${media.filename}" width height xpos ypos`, (err, stdout, stderr) => {
         // BUG = EXEC HAS A MAX BUFFER LIMIT, WHEN ACHIEVES IT, STOPS EXECUTION 
         // putting on background doesn't work, possible solution: increase buffer size 
         if (err) {
             //some err occurred
             console.error(err)
         } else {
             // the *entire* stdout and stderr (buffered)
             console.log(`stdout: ${stdout}`);
             console.log(`stderr: ${stderr}`);
         }
     })*/

}

function openVideo(media, screen) {
    console.log('video media/screen', media, screen)
}

function openSharedImage() {

}

function openSharedVideo() {

}

function calculatePosition(position) {
    var x, y, maxX, maxY, width, height, dimensions
    new Promise((resolve, reject) => {
        exec("xdpyinfo | awk '/dimensions/\{print $2\}'", (err, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            dimensions = stdout
            resolve()
        })
    })
        .then(() => {
            dimensions = dimensions.replace(/\n/g, '')
            dimensions = dimensions.split('x')
            maxX = dimensions[0]
            maxY = dimensions[1]
            //i have the dimensions of the screen, now i have to calculate the positions
            if (position == 'top') {
                x = 0
                y = 0
                width = maxX
                height = maxY / 3
            }
            else if (position == 'center') {
                x = 0
                y = maxY / 3
                width = maxX
                height = maxY / 3
            }
            else if (position == 'bottom') {
                x = 0
                y = 2 * (maxY / 3)
                width = maxX
                height = maxY / 3
            }
            else {
                x = 0
                y = 0
                width = maxX
                height = maxY / 3
            }
        })
        .then(() => {

            console.log('POS', x, y, width, height)
            return [x, y, width, height]
        })
        .catch(() => {
            console.log('Error when loading screen dimensions')
            x = 0
            y = 0
            width = 800
            height = 800

            console.log('POS', x, y, width, height)
            return [x, y, width, height]
        })


}

function flyTo(destination) {
    fs.writeFile(`/tmp/query.txt`, `search=${destination}`, (err) => {
        if (err) {
            console.log('Error on writing query.txt')
            throw err
        }
        console.log('File query.txt written with success!', destination)

    })
}
