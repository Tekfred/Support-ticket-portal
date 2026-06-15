import { createRouter, createWebHistory } from 'vue-router'
import UnassignedTicketsPage from '@/components/UnassignedTicketsPage.vue'
import MyWorkspacePage from '@/components/MyWorkspacePage.vue'
import BookedTicketsPage from '@/components/BookedTicketsPage.vue'
import DashboardAnalyticsPage from '@/components/DashboardAnalyticsPage.vue'

const routes = [
  { path: '/', redirect: '/unassigned' },
  { path: '/unassigned', name: 'unassigned', component: UnassignedTicketsPage },
  { path: '/my-tickets', name: 'my-tickets', component: MyWorkspacePage },
  { path: '/booked-tickets', name: 'booked-tickets', component: BookedTicketsPage },
  { path: '/analytics', name: 'analytics', component: DashboardAnalyticsPage },
  // Fallback to unassigned
  { path: '/:catchAll(.*)', redirect: '/unassigned' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
