import api from "../api/apiConnection"

export default {
    state:{
        presentations: []
    },
    mutations:{
        setPresentations(state,payload){
            state.presentations = payload
        }
    },
    actions:{
        async getAllPresentations({commit}){
            var pres = await api.getAllPresentation()
            console.log('presentations',pres)
            commit('setPresentations',pres)
        }
    },
    getters:{

    }
}