export default {
    state: {
        presentation: {
            slides:[]
        },
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
    },
    actions: {
        addBasicInformation({ commit, state }, payload) {
            console.log(payload.audio)
            if (payload.audio != undefined) {
                console.log('aoba',payload.audio)
                commit('setMediaToUpload',{media: payload.audio, info:{screen:1, type:'audio'} })
                payload.audio = `${state.storagePath}/${payload.audio.name}`
            }

            commit('setBasicInformation', payload)
            console.log(state.mediaToUpload)
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