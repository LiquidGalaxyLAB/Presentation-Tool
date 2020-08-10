import api from "../api/apiConnection"

export default {
    state: {
        first_enter: true
    },
    mutations: {
        setFirstEnter(state,payload){
            state.first_enter = payload
        }
    },
    actions: {
        async cleanLiquidGalaxyStorage({ dispatch }) {
            var res = await api.cleanStorage()
            dispatch('logResponse', res)
        }
    },
    getters: {

    }
}