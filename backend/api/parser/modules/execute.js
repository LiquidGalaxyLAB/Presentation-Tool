const { exec } = require('child_process')
const fs = require('fs')
const storage = require('./storage')

module.exports = {
    execPresentation: async function (presentationJson) {
        // if presentation has an audio that will be played the whole time
        console.log('ENTERED EXE')
        if (presentationJson.audiopath != undefined) {
            execAudio(presentationJson.audiopath)
        }

        // iterates the slides
        for (var i = 0; i < presentationJson.slides.length; i++) {
            execSlide(presentationJson.slides[i])
            await sleep(presentationJson.slides[i].duration).then(() => killSlide(presentationJson.slides[i]))
            //await sleep(3600).then(() => killSlide(presentationJson.slides[i]))

            // kills audio if it is the end of the presentation
            if(i == presentationJson.slides.length -1)
                exec(`pkill ffplay`)

        }
    },

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function killSlide(slide) {
    // kill slide when time is off
    slide.screens.forEach(screen => {
        screen.media.forEach(m => {
            console.log(m)
            if(m.type == 'image'){
                //call exec to do ssh and pkill feh
                exec(`ssh lg${screen.screennumber} "pkill feh"`)
            }
            else if(m.type == 'video'){
                //call exec to do ssh and pkill mpv
                exec(`ssh lg${screen.screennumber} "pkill mpv"`) //i think it didn't work. gotta test
            }
        });
    });

    // kill slide audio
    if(slide.audiopath != undefined){
        exec(`pkill ffplay`)
    }
}

function execSlide(slide) {
    if (slide.flyto != undefined) {
        //flyTo(slide.flyto)
    }
    if (slide.audiopath != undefined) {
        //execAudio(slide.audiopath)
    }

    slide.screens.forEach(screen => {
        screen.media.forEach(m => {
            if (m.type != undefined) {
                if (m.type == 'image') {
                    if (m.sharing) {
                        console.log('FIRST')
                        openSharedImage(m, screen.screennumber)
                    }
                    else{
                        //openImage(m, screen.screennumber)
                    }
                    
                }
                else if (m.type == 'video') {
                    if (m.sharing) {
                        openSharedVideo(m, screen.screennumber)
                    }
                    else{
                        //openVideo(m, screen.screennumber)
                    }
                    
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
    var file_path
    if (screen == 1) {
        file_path = `${process.env.FILE_PATH}/storage/${media.storagepath}/${media.filename}`
    }
    else {
        file_path = `${process.env.SLAVE_STORAGE}/${media.storagepath}/${media.filename}`
    }
    runOpenScript('Image',screen,file_path, media.position)
}

function openVideo(media, screen) {
    var file_path
    if(screen == 1){
        file_path = `${process.env.FILE_PATH}/storage/${media.storagepath}/${media.filename}`
    }
    else {
        file_path = `${process.env.SLAVE_STORAGE}/${media.storagepath}/${media.filename}`
    }

    runOpenScript('Video',screen,file_path,media.position)
}

function runOpenScript(type,screen, file_path, position){
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

async function openSharedImage(media,screen) {
    var file_path
    console.log('SECOND')

    if(screen != 1)
        file_path = `${process.env.SLAVE_STORAGE}/${media.storagepath}`
    else
        file_path = `${process.env.FILE_PATH}/storage/${media.storagepath}`
    
   // await storage.cropImageInTwo(screen, media.partner, file_path, media.filename,media.storagepath)
    //.then(() =>{
        // very wrong and hardcoded for now
        //runOpenScript('Image',screen, file_path, `${media.filename}Left.png`,800,800,2000,500)
        //runOpenScript('Image',media.partner,file_path, `${media.filename}Right.png`,800,800,0,500 )
    //})
}

function openSharedVideo(media, screen) {
    console.log('video media/screen', media, screen)
    var x, y, maxX, maxY, width, height, dimensions, file_path, leftScreen,rightScreen

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
        width = maxX / 2
        height = maxY / 3
        // x and y dimensions on video script are measured in %
        if (media.position == 'top') {
            y = 0
        }
        else if (media.position == 'center') {
            y = 100 / 3
        }
        else if (media.position == 'bottom') {
            y = 2 * (100 / 3)
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
        exec(`${process.env.FILE_PATH}/api/parser/scripts/shareVideo.sh ${screen} ${media.partner} ${file_path}/"${media.storagepath}"/"${media.filename}" ${width} ${height} ${x} ${y}`, (err, stdout, stderr) => {
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
    promise.catch(() => {
        console.log('Error on executing script')
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
