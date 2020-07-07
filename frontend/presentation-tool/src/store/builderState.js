export default {
    state: {
        presentation: {
            slides:[]
        },
        currentSlide:{
            media:[]
        },
        maxScreens:"",
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
        setMaxScreens(state,payload){
            state.maxScreens =payload
        },
        addSlide(state,payload){
            state.presentation.slides.push(payload)
            state.currentSlide = {media:[]}
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
        savePresentation({state,dispatch}){
            console.log('db',state.presentation)
            console.log('storage',state.mediaToUpload)
            dispatch('createPresentation',Object.assign({},{dbinfo:  state.presentation, storage: state.mediaToUpload }))
        }

    },
    getters: {
        slides(state){
            var slides = []
            state.presentation.slides.forEach(slide => {
                var parsedDuration = {minutes: '',seconds:''}
                var mili = slide.duration / 1000 //transform to seconds
                parsedDuration.minutes = Math.floor(mili / 60) //transform to minutes
                parsedDuration.seconds = mili - (parsedDuration.minutes * 60)
                var s = Object.assign({},slide)
                s.duration = parsedDuration
                slides.push(s)
            });

            return slides
        }
    }
}