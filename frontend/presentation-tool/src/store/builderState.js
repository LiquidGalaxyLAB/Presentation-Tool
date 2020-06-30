export default {
    state: {
        presentation: {},
        storagePath: "",
        mediaToUpload:{
            media: [],
            storagepath:"",
            screens:[]
        },
        screensQt:"",
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
        setScreensQt(state,payload){
            state.screensQt = payload
        }
    },
    actions: {
        addBasicInformation({ commit, state }, payload) {
            if (payload.audio != undefined) {
                commit('setMediaToUpload',{media: payload.audio, info:{screen:1, type:'audio'} })
                payload.audio = `${state.storagePath}/${payload.audio.name}`
            }

            commit('setBasicInformation', payload)
        },
        generateStoragePathName({ commit }, payload) {
            var pathName = payload
            pathName = pathName.toString().toLowerCase()
            pathName = pathName.replace(/\s+/g, '-')
            commit('setStoragePath', pathName)
        }

    },
    getters: {

    }
}