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
            commit('addSlide',payload)
        },
        newMedia({commit},payload){
            commit('setMediaToUpload', {media: payload.file, info:{screen: payload.mediaInfo.screen, type:payload.mediaInfo.type}})
            commit('addMedia',payload.mediaInfo)
        },
        addBasicInformation({ commit, state }, payload) {
            console.log(payload.audio)
            if (payload.audio != undefined) {
                console.log('aoba',payload.audio)
                commit('setMediaToUpload',{media: payload.audio, info:{screen:1, type:'audio'} })
                payload.audio = `${state.storagePath}/${payload.audio.name}`
            }

            commit('setBasicInformation', payload)
            console.log('state',state.presentation)
        },
        generateStoragePathName({ commit }, payload) {
            var pathName = payload
            pathName = pathName.toString().toLowerCase()
            pathName = pathName.replace(/\s+/g, '-')
            commit('setStoragePath', pathName)
        }

    },
    getters: {
        slidesLenght(state){
            return state.presentation.slides.length
        }
    }
}