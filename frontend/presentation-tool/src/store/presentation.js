export default {
    state: {
        presentation: {
            a: "aaa"
        }
    },
    mutations: {
        setBasicInformation(state,payload){
            state.presentation = Object.assign(state.presentation, payload)
        }
    },
    actions: {
        addBasicInformation({commit,state}, payload){
            console.log('payload',payload)
            commit('setBasicInformation',payload)
            console.log('state',state.presentation)
        },

    },
    getters:{

    }
}