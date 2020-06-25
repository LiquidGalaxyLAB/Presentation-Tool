import api from "../api/apiConnection"

export default {
    state:{
        presentations: []
    },
    mutations:{
        setPresentations(state,payload){
            state.presentations = payload
        },
        removePresentationFromList(state,payload){
            state.presentations.splice(payload,1)
        }
    },
    actions:{
        async getAllPresentations({commit}){
            var pres = await api.getAllPresentation()
            commit('setPresentations',pres)
        },
        async deleteById({commit,state,dispatch},payload){
            var res = await api.deletePresentation(payload)
            if(res.status == 200){
                state.presentations.forEach((p,index) => {
                    if(p._id == payload){
                        commit('removePresentationFromList',index)
                    }
                });
            }
            dispatch('logResponse', res)
        }
    },
    getters:{

    }
}