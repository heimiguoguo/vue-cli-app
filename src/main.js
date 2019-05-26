// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App2'
import router from './router'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    age: 25
  },
  mutations: {
    increment(state) {
      state.count++
      state.age++
    },
    incrementBy(state, payLoad) {
      state.count += payLoad.amount
      state.age += payLoad.amount
    },
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)

    },
    actionA({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('increment')
          resolve()
        }, 1000)
      })
    },
    actionB({ dispatch, commit }) {
      return dispatch('actionA').then(() => {
        commit({
          type: 'incrementBy',
          amount: 5
        })
      })
    }
  }
})

// store.dispatch('actionB').then(() => {
//   console.log('increment first, then increment by 5')
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
