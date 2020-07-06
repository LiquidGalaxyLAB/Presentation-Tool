export default {
    state: {
        presentation: {
            slides:[]
        },
        currentSlide:{
            media:[]
        },
        maxScreens:5,
        storagePath: "",
        mediaToUpload:{
            media: [],
            storagepath:"",
            screens:[]
        },
    },
    mutations: {
        setBasicInformation(state, payload) {
            state.presentation = Object.assign(state.presentation, payload)
        },
        setMediaToUpload(state,payload){
            state.mediaToUpload.storagepath = state.storagePath
            state.mediaToUpload.media.push(payload.media)
            state.mediaToUpload.screens.push(payload.info)
        },
        setStoragePath(state, payload) {
            state.storagePath = payload
        },
        addSlide(state,payload){
            state.presentation.slides.push(payload)
        },
        addMedia(state,payload){
            state.currentSlide.media.push(payload)
        }
    },
    actions: {
        newSlide({commit,state},payload){
            payload = Object.assign(state.currentSlide, payload)
            if (payload.audiopath != undefined) {
                commit('setMediaToUpload',{media: payload.audiopath, info:{screen:1, type:'audio'} })
                payload.audiopath = `${state.storagePath}/${payload.audiopath.name}`
            }
            commit('addSlide',payload)
        },
        newMedia({commit},payload){
            commit('setMediaToUpload', {media: payload.file, info:{screen: payload.mediaInfo.screen, type:payload.mediaInfo.type}})
            commit('addMedia',payload.mediaInfo)
        },
        addBasicInformation({ commit, state }, payload) {
            if (payload.audiopath != undefined) {
                commit('setMediaToUpload',{media: payload.audiopath, info:{screen:1, type:'audio'} })
                payload.audiopath = `${state.storagePath}/${payload.audiopath.name}`
            }

            commit('setBasicInformation', payload)
            console.log('state',state.presentation)
        },
        generateStoragePathName({ commit }, payload) {
            var pathName = payload
            pathName = pathName.toString().toLowerCase()
            pathName = pathName.replace(/\s+/g, '-')
            commit('setStoragePath', pathName)
        },
        savePresentation({state}){
            console.log(state.presentation)
        }

    },
    getters: {
        slidesLenght(state){
            return state.presentation.slides.length
        }
    }
}