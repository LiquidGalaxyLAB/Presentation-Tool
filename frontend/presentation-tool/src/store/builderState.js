import utils from "@/utils/utils"
import parser from "@/utils/parser"

export default {
    state: {
        presentation: {
            id:"",
            title: "",
            description: "",
            category: "",
            audiopath: "",
            maxscreens: "",
            file: null,
            slides: []
        },
    },
    mutations: {
        setPresentation(state,payload){
            state.presentation = payload
        },
        setPresentationBasicInformation(state, payload) {
            state.presentation.id = payload.id
            state.presentation.title = payload.title
            state.presentation.description = payload.description
            state.presentation.category = payload.category
            state.presentation.audiopath = payload.audiopath
            state.presentation.file = payload.file
            state.presentation.maxscreens = payload.maxscreens
        },
        newSlideIdOnly(state,payload){
            state.presentation.slides.push(payload)
        },
        setSlideToPresentation(state, payload) {
            state.presentation.slides[payload.index] = payload.slide
        },
        removeSlide(state, payload) {
            state.presentation.slides.splice(payload, 1)
        },
        addMediaToSlide(state,payload){
            state.presentation.slides[payload.index].media.push(payload.media)
        },
        setEditedMedia(state,payload){
            state.presentation.slides[payload.indexSlide].media[payload.indexMedia] = payload.media
        },
        removeMedia(state, payload) {
            state.presentation.slides[payload.slideIndex].media.splice(payload.mediaIndex, 1)
        },
        cleanBuilderState(state){
            state.presentation = {
                title: "",
                description: "",
                category: "",
                audiopath: "",
                maxscreens: "",
                file: null,
                slides: []
            }
            state.edit = false
        }
    },
    actions: {
        presentationBasicInformation({ commit,state }, payload) {
            if (payload.file != null) {
                payload.audiopath = utils.generateStoragePathName(state.presentation.id, payload.file.name)
            }
            commit('setPresentationBasicInformation', payload)
        },
        createSlideToPresentation({ commit, state }, payload) {
            console.log('slideBasicInformation', payload)
            if (payload.file != null) {
                payload.audiopath = utils.generateStoragePathName(state.presentation.id, payload.file.name)
            }
            var index
            state.presentation.slides.forEach((slide,i) =>{
                if(payload.id == slide.id){
                    index = i
                }
            })
            commit('setSlideToPresentation', {index: index, slide: payload})
        },
        editSlideOnPresentation({commit,state},payload){
            console.log('editedslide',payload)
            var index
            state.presentation.slides.forEach((slide,i) =>{
                if(slide.id == payload.id){
                    index = i
                }
            })
            commit('setSlideToPresentation',{index:index, payload})
        },
        deleteSlide({commit,state},payload){
            console.log('payload',payload)
            var index
            state.presentation.slides.forEach((slide,i) =>{
                if(payload.id == slide.id){
                    index = i
                }
            })

            commit('removeSlide',index)
        },
        createNewMedia({ commit,state }, payload) {
            console.log('createNewMedia', payload)
            
            var index
            state.presentation.slides.forEach((slide,i) =>{
                if(slide.id == payload.slideID){
                    index = i
                }
            })
            commit('addMediaToSlide',{index: index, media: payload.media})
        },
        editedMedia({commit,state},payload){
            console.log('editedMedia',payload)
            var indexSlide
            var indexMedia
            state.presentation.slides.forEach((slide,slideIndex) =>{
                if(payload.slideID == slide.id){
                    indexSlide = slideIndex
                    slide.media.forEach((media,index) =>{
                        if(media.id == payload.media.id){
                            indexMedia = index
                        }
                    })
                }
            })

            commit('setEditedMedia',{indexSlide: indexSlide, indexMedia: indexMedia, media: payload.media})
        },
        deleteMedia({commit,state},payload){
            console.log('deleteMedia',payload)
            var indexSlide
            var indexMedia
            state.presentation.slides.forEach((slide,slideIndex) =>{
                if(payload.slideID == slide.id){
                    indexSlide = slideIndex
                    slide.media.forEach((media,index) =>{
                        if(media.id == payload.media.id){
                            indexMedia = index
                        }
                    })
                }
            })

            commit('removeMedia', {slideIndex: indexSlide, mediaIndex:indexMedia})
        },
        async savePresentation({state,dispatch},payload){
            var storagepath = utils.generateStoragePathName(state.presentation.id,'')
            storagepath = storagepath.substring(0, storagepath.length - 1)
            var mediaToUploadJSON = await parser.parseToUploadMediaJSON(state.presentation,storagepath)
            var presentationJSON = parser.parseToPresentationJSON(state.presentation)

            console.log('mediatouploadJSON',mediaToUploadJSON)
            console.log('presentationJSON',presentationJSON)

            if(payload == "edit"){
                dispatch('updatePresentation',{storage: mediaToUploadJSON, dbinfo:{id: presentationJSON._id, data: presentationJSON}})
            }
            else{
                dispatch('createPresentation',{storage: mediaToUploadJSON,dbinfo:presentationJSON})
            }
            
            
        },
        editPresentation({commit},payload){
            console.log('payload to edit',payload)
            var presentationToEdit = parser.parseFromJSON(payload)
            commit('setPresentation',presentationToEdit)
        },
    },
    getters: {
        slides(state) {
            var slides = []
            state.presentation.slides.forEach(slide => {
                var parsedDuration = { minutes: '', seconds: '' }
                var mili = slide.duration / 1000 //transform to seconds
                parsedDuration.minutes = Math.floor(mili / 60) //transform to minutes
                parsedDuration.seconds = mili - (parsedDuration.minutes * 60)
                var s = Object.assign({}, slide)
                s.duration = parsedDuration
                slides.push(s)
            });

            return slides
        },
        currentScreenMedia(state){
            var screens = []
            state.slide.screens.forEach((screen) =>{
                if(screen.screennumber == state.screen.screennumber){
                    screens.push(screen)
                }
            })

            return screen
        }
    }
}