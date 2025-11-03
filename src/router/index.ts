import { createRouter, createMemoryHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Routine from '../views/Routine.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/routine', name: 'Routine', component: Routine },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
