import api from "../api/apiConnection"

export default {
    state: {
        presentations: []
    },
    mutations: {
        setPresentations(state, payload) {
            state.presentations = payload
        },
        removePresentationFromList(state, payload) {
            state.presentations.splice(payload, 1)
        }
    },
    actions: {
        async createPresentation({ dispatch }, payload) {
            //call to upload media
            var response = await api.uploadMedia(payload.storage)
            dispatch('logResponse', response)

            //call to save info in the db
            var res = await api.createPresentation(payload.dbinfo)
            dispatch('logResponse', res)

        },
        async updatePresentation(){},
        async executePresentation({ dispatch }, payload) {
            var res = await api.executePresentation(payload)
            if (res.status != 202) {
                dispatch('logResponse', res)
                return false
            }
            return true
        },
        async stopPresentation({ dispatch }) {
            var res = await api.stopPresentation()
            if (res.status != 200) {
                dispatch('logResponse', res)
                return false
            }
            return true
        },
        async getAllPresentations({ commit }) {
            var pres = await api.getAllPresentation()
            commit('setPresentations', pres)
        },
        async deleteById({ commit, state, dispatch }, payload) {
            var res = await api.deletePresentation(payload)
            if (res.status == 200) {
                state.presentations.forEach((p, index) => {
                    if (p._id == payload) {
                        commit('removePresentationFromList', index)
                    }
                });
            }
            dispatch('logResponse', res)
        }
    },
    getters: {

    }
}