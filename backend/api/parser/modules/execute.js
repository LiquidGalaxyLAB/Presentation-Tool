const { exec } = require('child_process')
const fs = require('fs')

// controls if presentation is currently running
var playing = false

module.exports = {
    execPresentation: async function (presentationJson) {
        playing = true
        // if presentation has an audio that will be played the whole time
        if (presentationJson.audiopath != undefined) {
            execAudio(presentationJson.audiopath)
        }

        // iterates the slides

        for (var i = 0; i < presentationJson.slides.length; i++) {
            if (playing) {
                execSlide(presentationJson.slides[i])
                await sleep(presentationJson.slides[i].duration).then(() => killSlide(presentationJson.slides[i]))
                //await sleep(3600).then(() => killSlide(presentationJson.slides[i]))

                // kills audio if it is the end of the presentation
                if (i == presentationJson.slides.length - 1)
                    exec(`pkill ffplay`)
            }
        }

    },
    stop: function () {
        playing = false
        exec(`${process.env.FILE_PATH}/api/parser/scripts/killPresentation.sh`, (err, stdout, stderr) => {
            if (err) {
                console.log(err)
                console.log('stdout', stderr)
            }
            else {
                console.log('stdout', stdout)
            }
        })
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function killSlide(slide) {
    // kill slide when time is off
    slide.screens.forEach(screen => {
        screen.media.forEach(m => {
            if (m.type == 'image') {
                //call exec to do ssh and pkill feh
                exec(`ssh lg${screen.screennumber} "pkill feh"`)

                if (m.sharing != undefined) {
                    exec(`ssh lg${m.partner} "pkill feh"`)
                }
            }
            else if (m.type == 'video') {
                //call exec to do ssh and pkill mpv
                exec(`ssh lg${screen.screennumber} "pkill mpv"`)

                if (m.sharing != undefined) {
                    exec(`ssh lg${m.partner} "pkill mpv"`)
                }
            }
        });
    });

    // kill slide audio
    if (slide.audiopath != undefined) {
        exec(`pkill ffplay`)
    }
}

function execSlide(slide) {
    if (slide.flyto != undefined) {
        flyTo(slide.flyto)
    }
    if (slide.audiopath != undefined) {
        execAudio(slide.audiopath)
    }

    slide.screens.forEach(screen => {
        screen.media.forEach(m => {
            if (m.type != undefined) {
                if (m.type == 'image') {
                    if (m.sharing) {
                        openSharedImage(m, screen.screennumber)
                    }
                    else {
                        openImage(m, screen.screennumber)
                    }

                }
                else if (m.type == 'video') {
                    if (m.sharing) {
                        openSharedVideo(m, screen.screennumber)
                    }
                    else {
                        openVideo(m, screen.screennumber)
                    }

                }
            }

        });
    })



}
function execAudio(audiopath) {
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
    var file_path
    if (screen == 1) {
        file_path = `${process.env.FILE_PATH}/storage/${media.storagepath}/${media.filename}`
    }
    else {
        file_path = `${process.env.SLAVE_STORAGE}/${media.storagepath}/${media.filename}`
    }

    if (media.position == "middle") {
        runOpenScript('MidImage', screen, file_path, media.position)
    }
    else {
        runOpenScript('Image', screen, file_path, media.position)
    }


}

function openVideo(media, screen) {
    var file_path
    if (screen == 1) {
        file_path = `${process.env.FILE_PATH}/storage/${media.storagepath}/${media.filename}`
    }
    else {
        file_path = `${process.env.SLAVE_STORAGE}/${media.storagepath}/${media.filename}`
    }
    if (media.position == "middle") {
        runOpenScript('MidVideo', screen, file_path, media.position)
    }
    else {
        runOpenScript('Video', screen, file_path, media.position)
    }


}

function runOpenScript(type, screen, file_path, position) {
    exec(`${process.env.FILE_PATH}/api/parser/scripts/open${type}.sh ${screen} ${file_path} "${position}"`, (err, stdout, stderr) => {
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

async function openSharedImage(media, screen) {

    var leftDest, rightDest

    if (screen != 1)
        leftDest = `${process.env.SLAVE_STORAGE}/${media.storagepath}/Left${media.filename}`
    else
        leftDest = `${process.env.FILE_PATH}/storage/${media.storagepath}/Left${media.filename}`

    if (media.partner != 1)
        rightDest = `${process.env.SLAVE_STORAGE}/${media.storagepath}/Right${media.filename}`
    else
        rightDest = `${process.env.FILE_PATH}/storage/${media.storagepath}/Right${media.filename}`

    if (media.position == "middle") {
        runOpenMidImageSharing(screen, media.partner, leftDest, rightDest)
    } else {
        runOpenScript('Image', screen, leftDest, media.position)
        runOpenScript('Image', media.partner, rightDest, media.position)
    }


}

function runOpenMidImageSharing(leftScreen, rightScreen, leftDest, rightDest) {
    exec(`${process.env.FILE_PATH}/api/parser/scripts/openMidImageSharing.sh ${leftScreen} ${rightScreen} ${leftDest} ${rightDest}`, (err, stdout, stderr) =>{
        if(err){
            console.log('Err',err)
        }
        else{
            console.log('stdout',stdout)
        }
    })
}

function openSharedVideo(media, screen) {
    console.log('NOT IMPLEMENTED video media/screen', media, screen)

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
