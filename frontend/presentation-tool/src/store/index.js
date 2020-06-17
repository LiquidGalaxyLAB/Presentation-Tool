import Vue from 'vue'
import Vuex from 'vuex'
import presentationStore from '@/store/presentation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    presentationStore
  }
})
