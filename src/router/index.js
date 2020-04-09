import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../pages/home'
import login from '../pages/login'
import stair from '../pages/stair'
import second from '../pages/second'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: home,
      name: 'home',
      children: [
        { path: '/stair', component: stair, name: 'stair' },
        { path: '/second', component: second, name: 'second' }
      ]
    },
    { path: '/login', component: login, name: 'login' }
  ]
})
export default router

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login') {
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
  // if (to.path !== '/login') {
  //   if (token) {
  //     // 如果有token
  //     next()
  //   } else {
  //     // 去登录页
  //     // next('/login')
  //     router.push('/login')
  //   }
  // } else {
  //   next()
  // }

  // if (to.path === '/login' || token) {
  //   next()
  // } else {
  //   router.push('/login')
  // }

  // 隐藏重复路由跳转的报错问题
  const originalPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push (location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
  }
})
