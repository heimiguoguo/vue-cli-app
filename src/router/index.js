import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
// import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Room from '@/components/Room'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Room
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/room',
      name: 'Room',
      component: Room
    }
  ]
})

function isAuthenticated () {
  // console.log(Cookies.get('koa.sess'))
  return Cookies.get('koa.sess')
}

router.beforeEach((to, from, next) => {
  if (to.name === 'Register') {
    next()
  } else if (to.name !== 'Login' && !isAuthenticated()) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
