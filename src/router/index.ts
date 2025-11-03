import { createRouter, createMemoryHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Routine from '../views/Routine.vue'
import SpecialStudies from '../views/SpecialStudies.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/routine', name: 'Routine', component: Routine },
  { path: '/special-studies', name: 'SpecialStudies', component: SpecialStudies },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
