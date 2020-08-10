// This file controls the execution of a presentation

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
            // show partner logos
            if (presentationJson.openlogos) {
                openLogos(presentationJson.maxscreens)
            }
            if (playing) {
                console.log('SLIDE', presentationJson.slides[i])
                execSlide(presentationJson.slides[i])
                await sleep(presentationJson.slides[i].duration).then(() => killSlide(presentationJson.slides[i]))

                // kills audio if it is the end of the presentation
                if (i == presentationJson.slides.length - 1)
                    exec(`pkill ffplay`)
            }
        }

    },
    stop: function () {
        playing = false

        return new Promise((resolve, reject) => {
            exec(`${process.env.FILE_PATH}/api/parser/scripts/killPresentation.sh`, (err, stdout, stderr) => {
                if (err) {
                    reject({ status: 500, msg: `Internal Server Error.Error on stopping presentation execution. ${stderr}` })
                }
                else {
                    console.log('Stopped all current applications', stdout)
                    resolve({ status: 200, msg: `Success. Stopped current presentation execution` })
                }

            })
        })

    }

}

function openLogos(screen) {
    exec(`${process.env.FILE_PATH}/api/parser/scripts/openLogos.sh ${screen} ${process.env.FILE_PATH}/utils/combined-logos-1200.png ${process.env.SLAVE_STORAGE} combined-logos-1200.png`, (err, stderr, stdout) => {
        if (err) {
            console.log('Error on opening logos', stderr)
        }
        else {
            console.log('Success on opening logos')
        }
    })
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
        if (err) {
            console.error(err)
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        else {
            console.log(`stdout: ${stdout}`);
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
    console.log('MEDIA', media)
    if (media.position == "middle") {
        runOpenScript('MidVideo', screen, file_path, media.position)
    }
    else {
        runOpenScript('Video', screen, file_path, media.position)
    }


}

function runOpenScript(type, screen, file_path, position) {
    exec(`${process.env.FILE_PATH}/api/parser/scripts/open${type}.sh ${screen} "${file_path}" "${position}"`, (err, stdout, stderr) => {
        if (err) {
            console.error(err)
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        else {
            console.log(`stdout: ${stdout}`);
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
    exec(`${process.env.FILE_PATH}/api/parser/scripts/openMidImageSharing.sh ${leftScreen} ${rightScreen} ${leftDest} ${rightDest}`, (err, stdout, stderr) => {
        if (err) {
            console.error(err)
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        else {
            console.log(`stdout: ${stdout}`);
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
