import { createRouter, createWebHistory } from 'vue-router'
import UnassignedTicketsPage from '@/views/UnassignedTicketsPage.vue'
import MyWorkspacePage from '@/views/MyWorkspacePage.vue'
import BookedTicketsPage from '@/views/BookedTicketsPage.vue'
import DashboardAnalyticsPage from '@/views/DashboardAnalyticsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/analytics',
  },
  {
    path: '/unassigned',
    name: 'unassigned',
    component: UnassignedTicketsPage,
  },
  {
    path: '/my-tickets',
    name: 'my-tickets',
    component: MyWorkspacePage,
  },
  {
    path: '/booked-tickets',
    name: 'booked-tickets',
    component: BookedTicketsPage,
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: DashboardAnalyticsPage,
  },
  // Fallback to analytics dashboard
  { path: '/:catchAll(.*)', redirect: '/analytics' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
