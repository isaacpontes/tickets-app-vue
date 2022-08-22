import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Subscribers from '../views/Subscribers.vue'
import Boards from '../views/Boards.vue'
import Inventories from '../views/Inventories.vue'
import Locations from '../views/Locations.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/subscribers', name: 'Subscribers', component: Subscribers },
  { path: '/boards', name: 'Boards', component: Boards },
  { path: '/inventories', name: 'Inventories', component: Inventories },
  { path: '/locations', name: 'Locations', component: Locations },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router