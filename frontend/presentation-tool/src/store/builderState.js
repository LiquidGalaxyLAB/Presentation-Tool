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
        media: {
            filename: "",
            type: "",
            storagepath: "",
            position: "",
            sharing: "",
            partner: "",
            file: null
        },
        slide: {
            duration: "",
            flyto: "",
            audiopath: "",
            file: "",
            screens: []
        },
        screen: {
            screennumber: "",
            media: []
        }
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
        addSlideToPresentation(state, payload) {
            state.presentation.slides.push(payload)
            state.slide = {
                duration: "",
                flyto: "",
                audiopath: "",
                file: "",
                screens: []
            }
        },
        setSlideBasicInformation(state, payload) {
            state.slide.duration = payload.duration
            state.slide.flyto = payload.flyto
            state.slide.audiopath = payload.audiopath
            state.slide.file = payload.file
        },
        addScreenToSlide(state) {
            state.slide.screens.push(state.screen)
        },
        setScreenNumber(state,payload){
            state.screen.screennumber = payload
        },
        setSlideScreens(state){
            state.presentation.maxscreens.forEach(() =>[
                state.slide.push() //continue add more screens
            ])
        },
        addMediaToScreen(state, payload) {
            console.log('pualoa',state.slide)
            state.slide.screens[payload.index].media.push(payload.media)
            state.media = {
                filename: "",
                type: "",
                storagepath: "",
                position: "",
                sharing: "",
                partner: "",
                file: null
            }
        },
        setMedia(state, payload) {
            state.media = payload
        },
        removeSlide(state, payload) {
            state.presentation.splice(payload, 1)
        },
        removeMedia(state, payload) {
            state.presentation.slide[payload.slideIndex].media.splice(payload.mediaIndex, 1)
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
            commit('setBasicSlideInformation', payload)
            commit('addSlideToPresentation', payload)
        },
        createNewMedia({ commit,state }, payload) {
            console.log('createNewMedia', payload)
            commit('setMedia', payload)
            commit('addMediaToScreen', {media:payload, index: state.screen.screennumber})
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