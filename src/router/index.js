import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/profile/Userindex.vue'
import Follow from '../views/profile/follow.vue'
import Comments from '../views/profile/comments.vue'
import Edituser from '../views/profile/Edituser.vue'
import UserStar from '../views/profile/userStar.vue'
import Test from '../views/Test.vue'
import Details from '../views/profile/details.vue'
import Search from '../views/profile/search.vue'
import Morecomments from '../views/profile/morecomments.vue'
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
    component: User,
    meta: {
      needAuth: true
    }
  },
  {
    path: "/follow",
    component: Follow,
    meta: {
      needAuth: true
    }
  },
  {
    path: "/comments",
    component: Comments,
    meta: {
      needAuth: true
    }
  },
  {
    path: "/edituser",
    component: Edituser,
    meta: {
      needAuth: true
    }
  },
  {
    path: "/userstar",
    component: UserStar,
    meta: {
      needAuth: true
    }
  },
  {
    path: "/test",
    component: Test
  },
  {
    path: "/details/:id",
    component: Details
  },
  {
    path: "/search",
    component: Search
  },
  {
    path: "/morecomments/:id",
    component: Morecomments
  }
]

const router = new VueRouter({
  routes
})

// 添加全局路由守卫
// 拦截所有跳转，执行回调函数
router.beforeEach((to, from, next) => {
  // 如果跳转到个人中心页面
  // 路由优化
  // 验证配置meta中需不需要验证token
  if (to.meta.needAuth) {
    // 判断localStorage是否存在token
    if (localStorage.getItem('token')) {
      // 有则放行
      return next()
    } else {
      // 否则就跳转到登录页面
      return router.push("/login").catch(err => {})
    }
  }


  // if (to.path == "/userindex" || to.path == "/edituser" || to.path == "/follow") {
  //   // 判断有无token再放行
  //   if (localStorage.getItem('token')) {
  //     // 则执行next()
  //     return next()
  //   } else {
  //     // 否则就跳转到登录页面
  //     return router.push("/login").catch(err => {})
  //   }
  // }
  return next()
})
export default router