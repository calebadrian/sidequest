import Vue from 'vue'
import Router from 'vue-router'
//@ts-ignore
import Home from '@/components/Home'
//@ts-ignore
import Login from '@/components/Login'
//@ts-ignore
import Post from '@/components/Post'
//@ts-ignore
import Comment from '@/components/Comment'
//@ts-ignore
import Example from '@/components/Example'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/api/posts/:postId',
      name: 'Example',
      component: Example
    }
  ]
})
