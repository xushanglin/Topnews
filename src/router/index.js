import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/profile/Userindex.vue'
import Attention from '../views/profile/attention.vue'
import followUp from '../views/profile/follow-up.vue'
import Edituser from '../views/profile/Edituser.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/userindex",
    component: User
  },
  {
    path: "/attention",
    component: Attention
  },
  {
    path: "/followup",
    component: followUp
  },
  {
    path: "/edituser",
    component: Edituser
  }
]

const router = new VueRouter({
  routes
})

// 添加全局路由守卫
// 拦截所有跳转，执行回调函数
router.beforeEach((to, from, next) => {
  // 如果跳转到个人中心页面
  if (to.path == "/userindex") {
    // 判断有无token再放行
    if (localStorage.getItem('token')) {
      // 则执行next()
      return next()
    } else {
      // 否则就跳转到登录页面
      return router.push("/login")
    }
  }
  return next()
})
export default router