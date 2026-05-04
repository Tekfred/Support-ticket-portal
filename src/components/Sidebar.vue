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

const Navigation = [
  { text: 'My Tickets', path: '/tickets', icons: 'person' },
  { text: 'Agent', path: '/agent', icons: 'person' },
]
</script>

<template>
  <aside
    class="sticky top-0 h-screen shrink-0 overflow-y-auto border-r border-slate-300 bg-slate-200 p-4 transition-colors dark:border-slate-700 dark:bg-slate-900"
    :class="isSidebarOpen ? 'w-60' : 'w-auto'"
  >
    <div class="flex items-center justify-between gap-3">
      <img alt="Vue logo" class="block" :src="icons" width="40" height="40" />
      <button
        type="button"
        class="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 transition-colors dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        @click="uiStore.toggleSidebar"
      >
        {{ isSidebarOpen ? 'Collapse' : 'Expand' }}
      </button>
    </div>

    <nav v-if="isSidebarOpen" class="flex flex-col gap-3 py-10" aria-label="Primary">
      <h1 class="pb-5 font-bold text-slate-900 dark:text-slate-100">views</h1>
      <RouterLink
        :to="navValue.path"
        v-for="navValue in Navigation"
        :key="navValue.path"
        v-slot="{ isExactActive }"
        class="p-2 px-1 font-semibold text-slate-900 no-underline transition-colors hover:text-blue-100 dark:text-slate-100"
        active-class="bg-blue-200 text-blue-600 dark:bg-slate-800"
      >
        <span
          class="material-symbols-outlined text-2xl transition-colors"
          :class="
            isExactActive
              ? 'text-[#4B2AAD] dark:text-[#9b8fd9]'
              : 'text-white/70 group-hover:text-white dark:text-gray-400 dark:group-hover:text-gray-300'
          "
        >
          {{ navValue.icons }}
        </span>
        <span
          class="font-medium text-sm whitespace-nowrap transition-all duration-300 overflow-hidden"
          :class="[
            isExactActive ? 'text-[#4B2AAD] font-semibold dark:text-[#9b8fd9]' : '',
            uiStore.isSidebarOpen ? 'max-w-xs opacity-100 w-auto' : 'max-w-0 opacity-0 w-0',
          ]"
        >
          {{ navValue.text }}
        </span>
      </RouterLink>

      <button
        class="absolute bottom-10 cursor-pointer rounded-lg border border-slate-300 bg-white px-10 py-2 text-start transition-colors dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      >
        <h3 class="text-xs text-slate-400 dark:text-slate-300">Current View</h3>
        <h1 class="font-bold">Agent Dashboard</h1>
      </button>
    </nav>
  </aside>
</template>
