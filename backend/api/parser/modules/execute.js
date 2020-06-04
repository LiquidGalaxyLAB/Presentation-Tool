const { exec } = require('child_process')
var fs = require('fs')

module.exports = {
    execPresentation: async function(presentationJson){    
        // find a way to combine async with iteration   
            /* presentationJson.slides.forEach(slide => {
            changeSlide(slide)
            if(presentationJson.hasOwnProperty('audiopath')){
                execAudio(presentationJson.audiopath)
            }
            execSlide(slide)
            await sleep(slide.duration).then(() => killSlide(slide))
        })*/
    },

}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

function killSlide(slide){
    // kill slide when time is off
}

function execSlide(slide){
    if(slide.hasOwnProperty('flyto')){
        flyTo(slide.flyTo)
    }
    if(slide.hasOwnProperty('audiopath')){
        execAudio(slide.audiopath)
    }
    
    slide.screens.forEach(screen =>{
        screen.media.forEach(m => {
            if(m.hasOwnProperty('type')){
                if(m.type == 'image'){
                    openImage(m,screen.screennumber)
                }
                else if(m.type = 'video'){
                    openVideo(m,screen.screennumber)
                }
            }
            
        });
    })
    


}
function execAudio(audiopath){
    console.log('AUDIOPATH',audiopath)
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
function openImage(){

}

function openVideo(){

}

function openSharedImage(){

}

function openSharedVideo(){

}

function flyTo (destination){
    fs.writeFile(`/tmp/query.txt`,`search=${destination}`, (err)=>{
        if(err){
            console.log('Error on writing query.txt')
            throw err
        }
        console.log('File query.txt written with success!', destination)
        
    })
}
