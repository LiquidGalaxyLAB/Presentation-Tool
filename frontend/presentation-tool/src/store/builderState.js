import utils from "../utils/utils"

export default {
    state: {
        presentation: {
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
        setPresentationBasicInformation(state, payload) {
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
        removeMedia(state, payload) {
            state.presentation.slides[payload.slideIndex].media.splice(payload.mediaIndex, 1)
        }
    },
    actions: {
        presentationBasicInformation({ commit }, payload) {
            if (payload.file != null) {
                payload.audiopath = utils.generateStoragePathName(payload.title, payload.file.name)
            }
            commit('setPresentationBasicInformation', payload)
        },
        createSlideToPresentation({ commit, state }, payload) {
            console.log('slideBasicInformation', payload)
            if (payload.file != null) {
                payload.audiopath = utils.generateStoragePathName(state.presentation.title, payload.file.name)
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
        deleteSlide({commit},payload){
            console.log('payload',payload)
            commit('removeSlide',payload.index)
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
        }
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