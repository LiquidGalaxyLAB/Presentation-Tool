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
        },
        async launchDemo({dispatch}) {
            var res = await api.launchDemo()
            dispatch('logResponse',res)
        }
    },
    getters: {

    }
}