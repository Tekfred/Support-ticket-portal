<script setup>
import { ref, computed } from 'vue'
import AppNavbar from '@/components/AppNavbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { useUiStore } from '@/stores/uiStore'
import { loadTickets } from '@/stores/Data'

// UI store controls the sidebar open/closed state. Sidebar component expects "isCollapsed" boolean.
const uiStore = useUiStore()
const isCollapsed = computed(() => !uiStore.isSidebarOpen)
const setIsCollapsed = (val) => {
  // val is true when sidebar should be collapsed
  uiStore.isSidebarOpen = !val
}

// Local UI state for active tab and counts derived from data
const activeTab = ref('unassigned')
const tickets = loadTickets() || []
const myTicketsCount = tickets.filter(t => t.acceptedBy === 'ansahaudi86@gmail.com').length
const unassignedCount = tickets.filter(t => t.acceptedBy == null).length
</script>

<template>
  <div
    class="flex h-screen overflow-hidden bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100"
  >
    <Sidebar
      :activeTab="activeTab"
      @selectTab="activeTab = $event"
      :isCollapsed="isCollapsed"
      @setIsCollapsed="setIsCollapsed"
      :myTicketsCount="myTicketsCount"
      :unassignedCount="unassignedCount"
    />
    <div
      class="flex h-screen min-w-0 flex-1 flex-col overflow-hidden bg-slate-100 transition-colors dark:bg-slate-950"
    >
      <AppNavbar />
      <main
        class="min-w-0 flex-1 overflow-y-auto bg-slate-100 p-6 transition-colors dark:bg-slate-950"
      >
        <slot />
      </main>
    </div>
  </div>
</template>
