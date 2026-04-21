import { createRouter, createWebHistory } from 'vue-router'
import Tickets from '@/views/Tickets/TicketsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/tickets',
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: Tickets,
    },
    {
      path: '/agent',
      name: 'agent',
      component: () => import('@/views/AgentsViews.vue'),
    },
  ],
})

export default router
