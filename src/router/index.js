import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search'
import CigarProfile from "@/views/CigarProfile";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    props: route => ({query: route.query.text})
  },
  {
      path: '/cigar/:brand/:name',
      name: 'Cigar',
      component: CigarProfile
  },
  {
    path: '/cigar/:brand/:subBrand/:name',
    name: 'CigarWithSubBrand',
    component: CigarProfile
  }
]

const router = new VueRouter({
  routes
})

export default router
