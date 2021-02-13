import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game/:gameID',
    name: 'Game',
    component: () => import("../views/Game")
  },
  {
    path: '/lost_connection',
    name: "Lost Connection",
    component: () => import("../views/LostConnection")
  }
]

const router = new VueRouter({
  routes
})

export default router
