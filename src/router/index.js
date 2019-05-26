import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import User from '@/components/User'
import Profile from '@/components/Profile'
import Posts from '@/components/Posts'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User,
      children: [
        {
          path: 'profile',
          component: Profile
        },
        {
          path: 'posts',
          component: Posts
        },
        {
          path: '',
          component: Home
        }
      ]
    }
  ]
})
