<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/uiStore'
import { useThemeStore } from '@/stores/themeStore'
import image from '@/assets/profile_img_1.png'
// import { INITIAL_TICKETS, INITIAL_BOOKINGS } from '@/stores/Data'

import { Sun, Moon, Bell, Info, LifeBuoy, ChevronRight, Check } from 'lucide-vue-next'
// import { Sparkles } from 'lucide-vue-next'

defineOptions({ name: 'AppNavbar' })

// UI & Theme stores
const uiStore = useUiStore()
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

// Local reactive state
const emit = defineEmits(['logout'])

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
  emit('logout')
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
    class="h-20 border-b border-slate-200/80 bg-white/90 shrink-0 px-6 md:px-8 flex items-center justify-between z-10 shadow-sm backdrop-blur transition-colors dark:bg-[#080b12]/95 dark:border-slate-800 dark:shadow-black/30"
    id="universal-header"
  >
    <!-- Left path info -->
    <div class="flex items-center gap-3 select-none">
      <button
        v-if="isSidebarCollapsed"
        @click="uiStore.toggleSidebar()"
        class="hidden md:flex p-1.5 px-2.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition cursor-pointer dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-400 dark:hover:text-slate-200 dark:border dark:border-slate-800"
        id="sidebar-expand-btn-outer"
        title="Expand Sidebar"
      >
        Expand
      </button>

      <!-- Mobile logo + page name -->
      <div class="flex items-center gap-2 lg:hidden">
        <div class="h-8 w-8 shrink-0 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 ring-1 ring-indigo-300/20">
          <LifeBuoy class="h-4 w-4 animate-pulse" />
        </div>
        <span class="font-display font-semibold tracking-tight text-sm text-slate-900 dark:text-white truncate">
          <slot name="active-label">Backlog queue</slot>
        </span>
      </div>

      <div class="flex items-center gap-1.5 text-xs text-slate-400 font-mono dark:text-slate-500 truncate hidden lg:flex">
        <span class="uppercase">TBase Console</span>
        <ChevronRight class="w-3 h-3 text-slate-350 dark:text-slate-600" />
        <span class="font-bold tracking-wider text-indigo-600 uppercase dark:text-indigo-400 truncate">
          <slot name="active-label">Backlog queue</slot>
        </span>
      </div>
    </div>

    <!-- Right widgets -->
    <div class="flex items-center gap-2 sm:gap-3">
      <!-- Demo Reset helper -->
      <button
        @click="handleResetDemoState"
        class="flex text-[10px] font-mono font-bold bg-amber-50 hover:bg-amber-100 text-amber-700 px-2 py-1 rounded-lg border border-amber-200 transition-colors cursor-pointer dark:bg-amber-900/30 dark:hover:bg-amber-900/50 dark:text-amber-400 dark:border-amber-800 md:text-[10px] md:px-2.5 md:py-1.5"
        title="Reset state values to starter defaults"
      >
        Reset Demo values
      </button>

      <!-- Dark & Light Toggle block -->
      <button
        @click="themeStore.toggleTheme()"
        class="p-2 transition duration-200 cursor-pointer rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-indigo-300 dark:hover:bg-slate-900 dark:hover:ring-1 dark:hover:ring-slate-800"
        title="Toggle theme mode"
        id="theme-toggler"
      >
        <Moon v-if="!isDark" class="w-5 h-5" />
        <Sun v-else class="w-5 h-5 text-amber-400" />
      </button>

      <!-- Notification system bell -->
      <div class="relative">
        <button
          class="p-2 transition duration-200 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-indigo-300 dark:hover:bg-slate-900 dark:hover:ring-1 dark:hover:ring-slate-800"
        >
          <Bell class="w-5 h-5" />
        </button>
        <span
          class="absolute top-1 right-1 h-2.5 w-2.5 bg-indigo-600 rounded-full ring-2 ring-white animate-none dark:ring-slate-900"
        />
      </div>

      <div class="h-6 border-l border-slate-200 shrink-0 dark:border-slate-700 hidden sm:block" />

      <!-- User identification avatar card -->
      <div class="flex items-center gap-3 select-none">
        <div class="hidden font-sans text-right sm:block">
          <p class="text-xs font-bold leading-none text-slate-800 dark:text-slate-200">M Mike</p>
          <p class="text-[10px] text-slate-400 mt-1 font-mono leading-none dark:text-slate-500">
            Desk Agent
          </p>
        </div>
        <div
          @click="toggleProfileDropdown"
          class="flex items-center justify-center text-xs font-bold text-white border shadow cursor-pointer select-none h-9 w-9 rounded-xl shadow-indigo-600/30 border-indigo-500/10 shrink-0"
        >
          <img :src="image" alt="profile" class="object-cover h-9 w-9 rounded-xl" />
        </div>
      </div>

      <!-- Profile dropdown -->
      <div
        v-if="profileDropdownOpen"
        class="absolute z-50 w-48 mt-2 overflow-hidden transition-colors right-6 top-20 rounded-xl surface-panel"
      >
        <div class="py-2">
          <button
            @click="closeDropdown"
            class="flex items-center w-full gap-2 px-4 py-2 text-left transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <span class="text-lg"><LifeBuoy class="w-4 h-4" /></span>
            <span>My Profile</span>
          </button>
          <button
            @click="closeDropdown"
            class="flex items-center w-full gap-2 px-4 py-2 text-left transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <span class="text-lg"><Info class="w-4 h-4" /></span>
            <span>Settings</span>
          </button>
          <button
            @click="handleLogout"
            class="flex items-center w-full gap-2 px-4 py-2 font-semibold text-left text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            <span class="text-lg"><Check class="w-4 h-4" /></span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
