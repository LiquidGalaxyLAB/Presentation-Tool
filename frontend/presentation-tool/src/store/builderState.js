import utils from "../utils/utils"

export default {
    state:{
        presentation:{
            title:"",
            description:"",
            category:"",
            audiopath:"",
            file:null,
            slides:[]
        },
        media:{
            filename:"",
            type:"",
            storagepath:"",
            position:"",
            sharing:"",
            partner:"",
            file:null
        },
        slide:{
            duration:"",
            flyto:"",
            audiopath:"",
            screens:[]
        },
        screen:{
            screennumber:"",
            media:[]
        }
    },
    mutations:{
        setPresentationBasicInformation(state,payload){
            state.presentation.title = payload.title
            state.presentation.description = payload.description
            state.presentation.category = payload.category
            state.presentation.audiopath = payload.audiopath
            state.presentation.file = payload.file
        },
        addSlideToPresentation(state,payload){
            state.presentation.slides.push(payload)
        },
        setSlideBasicInformation(state,payload){
            state.duration = payload.duration
            state.flyto = payload.flyto
            state.audiopath = payload.audiopath
        },
        addScreenToSlide(state,payload){
            state.screens.push(payload)
        },
        addMediaToScreen(state,payload){
            state.screen.push(payload)
        },
        setMedia(state,payload){
            state.media = payload
        },
        removeSlide(state,payload){
            state.presentation.splice(payload,1)
        },
        removeMedia(state,payload){
            state.presentation.slide[payload.slideIndex].media.splice(payload.mediaIndex,1)
        }
    },
    actions:{
        presentationBasicInformation({commit},payload){
            if(payload.file != null){
                payload.audiopath = utils.generateStoragePathName(payload.title,payload.file.name)
            }
            commit('setPresentationBasicInformation',payload)
        },
    },
    getters:{

    }
}