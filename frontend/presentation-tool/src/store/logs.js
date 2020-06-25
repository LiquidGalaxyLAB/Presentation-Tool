export default {
    state:{
        log:null,
        color:'blue'
    },
    mutations:{
        setLog(state,payload){
            state.log = payload
        },
        setColor(state,payload){
            state.color = payload
        }
    },
    actions:{
        logResponse({commit},payload){
            if(payload.status == 200 || payload.status == 201 || payload.status == 202){
                commit('setColor','green')
            }
            else{
                commit('setColor','red')
            }
            commit('setLog',payload.msg)
        }

    },
    getters:{

    }
}