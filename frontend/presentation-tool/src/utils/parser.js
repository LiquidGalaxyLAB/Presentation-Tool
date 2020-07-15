import utils from "@/utils/utils"

export default {
    parseToPresentationJSON: function (presentation) {
        //CLEAN UNUSED FIELDS

        //clean base of the object
        var parsedResult = Object.assign({}, presentation)
        parsedResult = cleanObject(parsedResult)

        //clean slides
        var cleanSlides = []
        parsedResult.slides.forEach(slide => {
            cleanSlides.push(cleanObject(slide))
        });
        parsedResult.slides = cleanSlides

        //clean media inside slides
        for (var i = 0; i < parsedResult.slides.length; i++) {
            for (var j = 0; j < parsedResult.slides[i].media.length; j++) {
                parsedResult.slides[i].media[j] = cleanObject(parsedResult.slides[i].media[j])
            }
        }

        //REMOVE FILES

        //from base
        parsedResult = removeFiles(parsedResult)

        //from slides
        var withoutFiles = []
        parsedResult.slides.forEach(slide => {
            withoutFiles.push(removeFiles(slide))
        });
        parsedResult.slides = withoutFiles

        //from media
        for (var a = 0; a < parsedResult.slides.length; a++) {
            for (var b = 0; b < parsedResult.slides[a].media.length; b++) {
                parsedResult.slides[a].media[b] = removeFiles(parsedResult.slides[a].media[b])
            }
        }

        //STORE MEDIA INSIDE SCREENS
        var screens = []
        var screennumber = 0
        var media = []
        var newSlides = []
        parsedResult.slides.forEach((slide) => {
            for (var s = 1; s <= parsedResult.maxscreens; s++) {
                screennumber = s
                slide.media.forEach(m => {
                    if (m.screen == s) {
                        media.push(m)
                    }
                })
                if (media.length != 0) {
                    screens.push({ screennumber: screennumber, media: media })
                }
                media = []
            }
            newSlides.push(Object.assign(slide,{screens: screens}))
            screens = []
        })

        parsedResult.slides = newSlides

        //remove the extra media field inside the slides
        for(var e = 0 ; e < parsedResult.slides.length; e++){
            parsedResult.slides[e].media = null
            parsedResult.slides[e] = cleanObject(parsedResult.slides[e])
        }

        //remove screen field inside media
        for(var c = 0; c < parsedResult.slides.length; c++){
            for(var d = 0; d < parsedResult.slides[c].screens.length;d++){
                for(var m = 0; m < parsedResult.slides[c].screens[d].media.length; m++){
                    parsedResult.slides[c].screens[d].media[m].screen = null
                    parsedResult.slides[c].screens[d].media[m] = cleanObject(parsedResult.slides[c].screens[d].media[m])
                }
            }
        }

        //parse duration to miliseconds
        parsedResult.slides.forEach(slide =>{
            slide.duration = utils.toMilliseconds(slide.duration.minutes,slide.duration.seconds)
        })

        return parsedResult
    },
    parseToUploadMediaJSON: function (presentation,storagePath) {        
        var mediaToUpload = {
            storagepath: storagePath,
            screens:[],
            media:[]
        }
        
        //check for audio on main base
        if(presentation.file != null || presentation.file != undefined){
            mediaToUpload.media.push(presentation.file)
            mediaToUpload.screens.push({screen:1,type:'audio'})
        }

        //check for audio inside the slides
        presentation.slides.forEach((slide) =>{
            if(slide.file != null || slide.file != undefined){
                mediaToUpload.media.push(slide.file)
                mediaToUpload.screens.push({screen:1,type:'audio'})
            }
        })

        //check for media inside screens
        presentation.slides.forEach((slide) =>{
            slide.media.forEach((m) =>{
                mediaToUpload.media.push(m.file)
                if(m.partner != null || m.partner != undefined){
                    mediaToUpload.screens.push({screen: m.screen,type: m.type, partner: m.partner})
                }
                else{
                    mediaToUpload.screens.push({screen: m.screen,type: m.type})
                }
                
            })
        })

        return mediaToUpload
    },
    parseFromJSON: function (pJSON){
        //convert duration of slides from millisecons
        var presentation = Object.assign({},pJSON)
        presentation.slides.forEach((slide) =>{
            slide.duration = utils.fromMilliseconds(slide.duration)
        })

        //store screen inside each media the screen number and create the media array
        var media = []
        presentation.slides.forEach((slide) =>{
            slide.screens.forEach((screen) =>{
                screen.media.forEach((m) =>{
                    m.screen = `${screen.screennumber}`
                    media.push(m)
                })
            })
            slide.media = media
            media = []
        })

        //kill array of screens
        for(var i = 0 ; i < presentation.slides.length; i++){
            presentation.slides[i].screen = null
            presentation.slides[i] = cleanObject(presentation.slides[i])
        }

        //if audiopath exists, add property file with value null
        if(presentation.audiopath != null && presentation.audiopath != undefined){
            presentation.file = null
        }

        //add file property to media fields with value null
        presentation.slides.forEach((slide) =>{
            slide.media.forEach((m) =>{
                m.file = null
            })
        })

        return presentation
    }
}

function removeFiles(obj) {
    for (var propName in obj) {
        if (propName == "file") {
            delete obj[propName]
        }
    }

    return obj
}

function cleanObject(obj) {
    // this method removes all unused attributes defined on the presentation
    for (var propName in obj) {
        if (
            obj[propName] === null ||
            obj[propName] === undefined ||
            obj[propName] === ""
        ) {
            delete obj[propName];
        }
    }
    return obj;
}