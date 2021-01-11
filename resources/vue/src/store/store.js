/*=========================================================================================
  File Name: store.js
  Description: Vuex store
==========================================================================================*/

import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

import moduleAuth from './auth/moduleAuth.js'
import moduleECommerce from './eCommerce/moduleECommerce.js'
import moduleGeneral from './general/moduleGeneral'

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    auth: moduleAuth,
    eCommerce: moduleECommerce,
    general: moduleGeneral
  },
  strict: process.env.NODE_ENV !== 'production'

})
