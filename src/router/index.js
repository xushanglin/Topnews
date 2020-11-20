import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/Userindex.vue'
import Attention from '../views/attention.vue'
import followUp from '../views/follow-up.vue'
import Edituser from '../views/Edituser.vue'
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

export default router