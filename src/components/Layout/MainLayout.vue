<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppNavbar from '@/components/Layout/AppNavbar.vue'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { useUiStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'
import { useTicketStore } from '@/stores/ticketStore'

const router = useRouter()
const route = useRoute()

// UI store controls the sidebar open/closed state. Sidebar component expects "isCollapsed" boolean.
const uiStore = useUiStore()
const isCollapsed = computed(() => !uiStore.isSidebarOpen)
const setIsCollapsed = (val) => {
  // val is true when sidebar should be collapsed
  uiStore.isSidebarOpen = !val
}

// Local UI state for active tab and counts derived from ticketStore
const ticketStore = useTicketStore()
const { tickets } = storeToRefs(ticketStore)
const activeTab = computed(() => {
  const routeName = route.name
  if (routeName === 'my-tickets') return 'my-tickets'
  if (routeName === 'booked-tickets') return 'booked-tickets'
  if (routeName === 'analytics') return 'analytics'
  return 'unassigned'
})
const myTicketsCount = computed(() => tickets.value.filter(t => t.acceptedBy === 'ansahaudi86@gmail.com').length)
const unassignedCount = computed(() => tickets.value.filter(t => t.acceptedBy == null).length)

const selectTab = (tabId) => {
  const routeMap = {
    'unassigned': '/unassigned',
    'my-tickets': '/my-tickets',
    'booked-tickets': '/booked-tickets',
    'analytics': '/analytics'
  }
  router.push(routeMap[tabId])
}
</script>

<template>
  <div
    class="flex h-screen overflow-hidden bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100"
  >
    <Sidebar
      :activeTab="activeTab"
      @selectTab="selectTab"
      :isCollapsed="isCollapsed"
      @setIsCollapsed="setIsCollapsed"
      :myTicketsCount="myTicketsCount"
      :unassignedCount="unassignedCount"
    />
    <div
      class="flex h-screen min-w-0 flex-1 flex-col overflow-hidden bg-slate-100 transition-colors dark:bg-slate-950"
    >
      <AppNavbar>
        <template #active-label>
          <template v-if="activeTab === 'unassigned'">Backlog queue</template>
          <template v-else-if="activeTab === 'my-tickets'">Agent claimed</template>
          <template v-else-if="activeTab === 'booked-tickets'">Luggage manifests</template>
          <template v-else-if="activeTab === 'analytics'">Operational dashboard</template>
        </template>
      </AppNavbar>

      <main
        class="min-w-0 flex-1 overflow-y-auto bg-slate-100 p-6 transition-colors dark:bg-slate-950"
      >
        <slot />
      </main>
    </div>
  </div>
</template>
