// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import App from './App'

Vue.config.productionTip = false
Vue.use(ElementUI, {size: 'middle'})
Vue.prototype.getUserAvatar = user => {
  if (user.avatar) {
    return `/api/static${user.avatar}`
  }
}
new Vue({
  // el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
