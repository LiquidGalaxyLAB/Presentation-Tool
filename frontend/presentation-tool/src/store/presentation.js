import api from "../api/apiConnection"
import utils from "@/utils/utils"

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
        },
        pushToPresentationsList(state, payload) {
            state.presentations.push(payload)
        }
    },
    actions: {
        async createPresentation({ commit, dispatch }, payload) {
            //call to upload media
            if (payload.storage.media[0] != undefined && payload.storage.media[0] != null) {
                var response = await api.uploadMedia(payload.storage)
                dispatch('logResponse', response)
            }

            //call to save info in the db
            var res = await api.createPresentation(payload.dbinfo)
            dispatch('logResponse', res)
            //commit('pushToPresentationsList',payload.dbinfo)
            commit('setOverlay', { value: false, text: '' })

        },
        async updatePresentation({ commit, dispatch }, payload) {
            console.log('payload', payload)
            if (!payload.storage.media.every((val) => val === null)) {
                payload.storage = utils.removeNullFields(payload.storage)
                var res = await api.uploadMedia(payload.storage)
                dispatch('logResponse', res)
            }

            var response = await api.updatePresentation(payload.dbinfo)
            dispatch('logResponse', response)

            commit('setOverlay', { value: false, text: '' })
        },
        async executePresentation({ dispatch }, payload) {
            var res = await api.executePresentation(payload)
            if (res.status != 202) {
                dispatch('logResponse', res)
                return false
            }
            return true
        },
        async stopPresentation({ commit, dispatch }, payload) {
            var res = await api.stopPresentation(payload)
            commit('setOverlay', { value: false, text: '' })
            dispatch('logResponse', res)
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
        },
        async exportPresentation({ commit, dispatch }, payload) {
            var res = await api.exportPresentation(payload)
            dispatch('logResponse', res)
            commit('setOverlay', { value: false, text: '' })
        },
        async importPresentation({ dispatch, commit }, payload) {
            console.log('zip file', payload)
            var res = await api.importPresentation(payload)
            commit('setOverlay', { value: false, text: '' })
            dispatch('logResponse', res)
        }
    },
    getters: {

    }
}