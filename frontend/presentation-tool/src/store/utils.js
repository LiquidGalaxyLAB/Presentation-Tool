import api from "../api/apiConnection"

export default {
    state: {

    },
    mutations: {

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