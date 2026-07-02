<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/uiStore'
import { useThemeStore } from '@/stores/themeStore'
import image from '@/assets/profile_img_1.png'
// import { INITIAL_TICKETS, INITIAL_BOOKINGS } from '@/stores/Data'

import { Sun, Moon, Bell, Info, LifeBuoy, ChevronRight, Check,  } from 'lucide-vue-next'
// import { Sparkles } from 'lucide-vue-next'


defineOptions({ name: 'AppNavbar' })

// UI & Theme stores
const uiStore = useUiStore()
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

// Local reactive state
const profileDropdownOpen = ref(false)

const isSidebarCollapsed = computed(() => !uiStore.isSidebarOpen)

const toggleProfileDropdown = () => {
  profileDropdownOpen.value = !profileDropdownOpen.value
}

const closeDropdown = () => {
  profileDropdownOpen.value = false
}

const handleLogout = () => {
  closeDropdown()
  // placeholder for actual logout logic
}

// Reset demo states if they want to restore initial values
const handleResetDemoState = () => {
  if (window.confirm('Reset all local tickets and bookings state back to defaults?')) {
    localStorage.removeItem('booking_support_tickets')
    localStorage.removeItem('booking_support_bookings')
    // reload to let app reinitialize from defaults
    window.location.reload()
  }
}
</script>

<template>
  <!-- Top universal Header bar -->
  <header
    class="h-20 border-b border-slate-200 bg-white shrink-0 px-6 md:px-8 flex items-center justify-between z-10 shadow-xs transition-colors dark:bg-slate-900 dark:border-slate-700 dark:shadow-slate-900/50"
    id="universal-header"
  >
    <!-- Left path info -->
    <div class="flex items-center gap-3 select-none">
      <button
        v-if="isSidebarCollapsed"
        @click="uiStore.toggleSidebar()"
        class="p-1.5 px-2.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-705 text-slate-600 transition cursor-pointer dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        id="sidebar-expand-btn-outer"
        title="Expand Sidebar"
      >
        Expand
      </button>
      <div class="flex items-center gap-1.5 text-xs text-slate-400 font-mono dark:text-slate-500">
        <span class="uppercase">VeloPort Console</span>
        <ChevronRight class="h-3 w-3 text-slate-350 dark:text-slate-600" />
        <span class="uppercase text-indigo-600 font-bold tracking-wider dark:text-indigo-400">
          <slot name="active-label">Backlog queue</slot>
        </span>
      </div>
    </div>

    <!-- Right widgets -->
    <div class="flex items-center gap-4">
      <!-- Demo Reset helper -->
      <button
        @click="handleResetDemoState"
        class="text-[10px] font-mono font-bold bg-amber-50 hover:bg-amber-100 text-amber-700 px-2.5 py-1.5 rounded-lg border border-amber-200 transition-colors cursor-pointer dark:bg-amber-900/30 dark:hover:bg-amber-900/50 dark:text-amber-400 dark:border-amber-800"
        title="Reset state values to starter defaults"
      >
        Reset Demo values
      </button>

      <!-- Dark & Light Toggle block -->
      <button
        @click="themeStore.toggleTheme()"
        class="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition duration-200 cursor-pointer dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-slate-800"
        title="Toggle theme mode"
        id="theme-toggler"
      >
        <Moon v-if="!isDark" class="h-5 w-5" />
        <Sun v-else class="h-5 w-5 text-amber-400" />
      </button>

      <!-- Notification system bell -->
      <div class="relative">
        <button
          class="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition duration-200 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-slate-800"
        >
          <Bell class="h-5 w-5" />
        </button>
        <span
          class="absolute top-1 right-1 h-2.5 w-2.5 bg-indigo-600 rounded-full ring-2 ring-white animate-none dark:ring-slate-900"
        />
      </div>

      <div class="border-l border-slate-200 h-6 shrink-0 dark:border-slate-700" />

      <!-- User identification avatar card -->
      <div class="flex items-center gap-3 select-none">
        <div class="text-right hidden sm:block font-sans">
          <p class="text-xs font-bold text-slate-800 leading-none dark:text-slate-200">M Mike</p>
          <p class="text-[10px] text-slate-400 mt-1 font-mono leading-none dark:text-slate-500">Desk Agent</p>
        </div>
        <div
          @click="toggleProfileDropdown"
          class="h-9 w-9 rounded-xl  text-white font-bold flex items-center justify-center shadow shadow-indigo-600/30 border border-indigo-500/10 text-xs shrink-0 select-none cursor-pointer"
        >
          <img :src="image" alt="profile" class="h-9 w-9 rounded-xl object-cover" />
        </div>
      </div>

      <!-- Profile dropdown -->
      <div
        v-if="profileDropdownOpen"
        class="absolute right-6 top-20 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800 transition-colors"
      >
        <div class="py-2">
          <button
            @click="closeDropdown"
            class="flex w-full items-center gap-2 px-4 py-2 text-left transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <span class="text-lg"><LifeBuoy class="h-4 w-4" /></span>
            <span>My Profile</span>
          </button>
          <button
            @click="closeDropdown"
            class="flex w-full items-center gap-2 px-4 py-2 text-left transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <span class="text-lg"><Info class="h-4 w-4" /></span>
            <span>Settings</span>
          </button>
          <button
            @click="handleLogout"
            class="flex w-full items-center gap-2 px-4 py-2 text-left font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            <span class="text-lg"><Check class="h-4 w-4" /></span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
