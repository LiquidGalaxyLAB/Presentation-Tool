export default {
    state: {
        presentation: {
            slides:[]
        },
        currentSlide:{
            id: null,
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
            state.maxScreens = payload
        },
        setCurrentSlideID(state,payload){
            state.currentSlide.id = payload
        },
        addSlide(state,payload){
            state.presentation.slides.push(payload)
            state.currentSlide = {media:[]}
        },
        addMedia(state,payload){
            state.currentSlide.media.push(payload)
        },
        cleanBuilderState(state){
            state.presentation = {slides:[]}
            state.currentSlide = {media:[]}
            state.maxScreens = ""
            state.storagepath = ""
            state.mediaToUpload = {media: [],storagepath:"",screens:[]}
        },
        removeSlideFromPresentation(state,payload){
            state.presentation.slides.splice(payload,1)
        }
    },
    actions: {
        newSlide({commit,state},payload){   
            if (payload.audiopath != undefined) {
                commit('setMediaToUpload',{media: {file:payload.audiopath, slideID: payload.id}, info:{screen:1, type:'audio'} })
                payload.audiopath = `${state.storagePath}/${payload.audiopath.name}`
            }
            payload = Object.assign(state.currentSlide, payload)
            commit('addSlide',payload)
        },
        newMedia({commit},payload){
            commit('setMediaToUpload', {media: {file:payload.file, slideID: payload.slideID}, info:{screen: payload.mediaInfo.screen, type:payload.mediaInfo.type}})
            commit('addMedia',payload.mediaInfo)
        },
        addBasicInformation({ commit, state }, payload) {
            if (payload.presentation.audiopath != undefined) {
                commit('setMediaToUpload',{media: {file:payload.presentation.audiopath, id:payload.id}, info:{screen:1, type:'audio'} })
                payload.presentation.audiopath = `${state.storagePath}/${payload.presentation.audiopath.name}`
            }

            commit('setBasicInformation', payload.presentation)
            console.log('state',state.presentation)
        },
        generateStoragePathName({ commit }, payload) {
            var pathName = payload
            pathName = pathName.toString().toLowerCase()
            pathName = pathName.replace(/\s+/g, '-')
            commit('setStoragePath', pathName)
        },
        savePresentation({state,dispatch}){
            var newArrayOfMedia = []
            state.mediaToUpload.media.forEach((m) =>{
                newArrayOfMedia.push(m.file)
            })
            var mediaToUpload = Object.assign({},state.mediaToUpload)
            mediaToUpload.media = newArrayOfMedia

            console.log('db',state.presentation)
            console.log('storage',mediaToUpload)

            dispatch('createPresentation',Object.assign({},{dbinfo:  state.presentation, storage: mediaToUpload }))
        },
        deleteSlide({commit,state},payload){
            //remove all slide media from mediaToUpload
            console.log('statemedia',state.mediaToUpload )
            //remove slide from presentation
            commit('removeSlideFromPresentation',payload.index)
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