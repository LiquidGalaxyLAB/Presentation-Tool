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
function openImage(media, screen) {
    var x, y, maxX, maxY, width, height, dimensions, file_path

    var promise = new Promise((resolve, reject) => {
        exec("xdpyinfo | awk '/dimensions/\{print $2\}'", (err, stdout, stderr) => {
            if (err) {
                console.log('ERROR', stderr)
                reject()
            }
            else {
                dimensions = stdout
                resolve()
            }
        })
    })
    promise.then(() => {
        console.log('Dimensions')
        dimensions = dimensions.replace(/\n/g, '')
        dimensions = dimensions.split('x')
        maxX = dimensions[0]
        maxY = dimensions[1]
        x = 0
        width = maxX
        height = maxY / 3
        //i have the dimensions of the screen, now i have to calculate the positions
        if (media.position == 'top') {
            y = 0   
        }
        else if (media.position == 'center') {
            y = maxY / 3
        }
        else if (media.position == 'bottom') {
            y = 2 * (maxY / 3)
        }
        else {
            y = 0
        }
        console.log('Final dimension', x, y, width, height)
    })
    promise.then(() => {
        console.log('Execute')
        if (screen == 1) {
            file_path = `${process.env.FILE_PATH}/storage`
        }
        else {
            file_path = `${process.env.SLAVE_STORAGE}`
        }
        
        // TEST ON LG
        exec(`${process.env.FILE_PATH}/api/parser/scripts/openImage.sh ${screen} ${file_path}/"${media.storagepath}"/"${media.filename}" ${width} ${height} ${x} ${y}`, (err, stdout, stderr) => {
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
    })
    promise.catch(() =>{
        console.log('Error on executing script')
    })

}

function openVideo(media, screen) {
    console.log('video media/screen', media, screen)
}

function openSharedImage() {

}

function openSharedVideo() {

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
