import { createRouter, createWebHistory } from 'vue-router'
import Tickets from '@/views/Ticketsview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Tickets,
    },
    {
      path: '/about',
      name: 'Ageent',
      component: () => import('@/views/AgentsViews.vue'),
    },
  ],
})

export default router
