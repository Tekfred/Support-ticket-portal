<script setup>
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useUiStore } from '@/stores/uiStore'

import icons from '@/assets/logo.svg'

defineOptions({
  name: 'AppSidebar',
})

const uiStore = useUiStore()
const { isSidebarOpen } = storeToRefs(uiStore)
</script>

<template>
  <aside
    class="flex flex-col gap-4 border-r border-slate-200 bg-slate-100 p-4"
    :class="isSidebarOpen ? 'min-h-screen w-60' : 'w-auto min-h-auto'"
  >
    <div class="flex items-center justify-between gap-3">
      <img
        alt="Vue logo"
        class="block"
        :src="icons"
        width="40"
        height="40"
      />
      <button
        type="button"
        class="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2"
        @click="uiStore.toggleSidebar"
      >
        {{ isSidebarOpen ? 'Collapse' : 'Expand' }}
      </button>
    </div>

    <nav v-if="isSidebarOpen" class="flex flex-col py-10 gap-3" aria-label="Primary">

      <h1 class=" font-bold">views</h1>
      <RouterLink
        to="/"
        class="px-1 font-semibold text-slate-900 no-underline transition-colors hover:text-blue-600"
        active-class="text-blue-600"
      >
        My Tickets
      </RouterLink>
      <RouterLink
        to="/about"
        class="px-1 font-semibold text-slate-900 no-underline transition-colors hover:text-blue-600"
        active-class="text-blue-600"
      >
        Agent
      </RouterLink>

      <button class="text-start cursor-pointer rounded-lg border border-slate-300 bg-white absolute bottom-10 px-10 py-2" >
        <h3 class="text-xs text-slate-400">Current View</h3>
        <h1 class="font-bold">Agent Dashboard</h1>
      </button>
    </nav>
  </aside>
</template>
