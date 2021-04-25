import Vue from 'vue'
import VueRouter from 'vue-router'
import Table from '../components/Table'
import FavoriteTable from '../components/FavoriteTable.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Table',
    component: Table
  },
  {
    path: '/favorite-table',
    name: 'FavoriteTable',
    component: FavoriteTable
  },
]
  

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
