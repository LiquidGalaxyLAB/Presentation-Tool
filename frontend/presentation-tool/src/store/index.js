import Vue from 'vue'
import Vuex from 'vuex'
import builderStore from '@/store/builderState'
import presentationStore from '@/store/presentation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    builderStore,
    presentationStore
  }
})
