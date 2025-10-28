import { createRouter, createWebHistory } from 'vue-router'
import ShowTaches from '../components/ShowTaches.vue'
import AddTaches from '../components/AddTaches.vue'

const routes = [
  { path: '/', component: ShowTaches },
  { path : '/addTache', component: AddTaches }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
