<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppNavbar from '@/components/Layout/AppNavbar.vue'
import Sidebar from '@/components/Layout/Sidebar.vue'
import BottomNav from '@/components/Layout/BottomNav.vue'
import { useUiStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'
import { useTicketStore } from '@/stores/ticketStore'

defineOptions({
  name: 'MainLayout',
})

defineProps({
  currentUser: {
    type: Object,
    default: null,
  }
})

const emit = defineEmits(['logout'])

const router = useRouter()
const route = useRoute()

const uiStore = useUiStore()
const isCollapsed = computed(() => !uiStore.isSidebarOpen)
const setIsCollapsed = (val) => {
  uiStore.isSidebarOpen = !val
}

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

const handleLogout = () => {
  emit('logout')
}
</script>

<template>
  <div
    class="flex h-screen overflow-hidden bg-(--app-bg) text-slate-900 transition-colors dark:text-slate-100"
  >
    <Sidebar
      class="hidden lg:flex"
      :activeTab="activeTab"
      @selectTab="selectTab"
      :isCollapsed="isCollapsed"
      @setIsCollapsed="setIsCollapsed"
      :myTicketsCount="myTicketsCount"
      :unassignedCount="unassignedCount"
      :currentUser="currentUser"
      @logout="handleLogout"
    />
    <div
      class="flex h-screen min-w-0 flex-1 flex-col overflow-hidden bg-(--app-bg) transition-colors"
    >
      <AppNavbar
        @logout="handleLogout"
      >
        <template #active-label>
          <template v-if="activeTab === 'unassigned'">Backlog queue</template>
          <template v-else-if="activeTab === 'my-tickets'">Agent claimed</template>
          <template v-else-if="activeTab === 'booked-tickets'">Luggage manifests</template>
          <template v-else-if="activeTab === 'analytics'">Operational dashboard</template>
        </template>
      </AppNavbar>

      <main
        class="min-w-0 flex-1 overflow-y-auto bg-(--app-bg) p-4 md:p-6 lg:p-8 pb-20 lg:pb-8 transition-colors"
      >
        <slot />
      </main>
    </div>
    <BottomNav
      :activeTab="activeTab"
      @selectTab="selectTab"
      @logout="handleLogout"
    />
  </div>
</template>
