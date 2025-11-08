import { createRouter, createMemoryHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Routine from '../views/Routine.vue'
import SpecialStudies from '../views/SpecialStudies.vue'
import MarrowStudies from '../views/MarrowStudies.vue'
import PreviousCases from '../views/PreviousCases.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/routine/:caseData?', name: 'routine', component: Routine, props: true },
  {
    path: '/special-studies/:caseData?',
    name: 'special-studies',
    component: SpecialStudies,
    props: true,
  },
  {
    path: '/marrow-studies/:caseData?',
    name: 'marrow-studies',
    component: MarrowStudies,
    props: true,
  },
  { path: '/previous-cases', name: 'PreviousCases', component: PreviousCases },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
