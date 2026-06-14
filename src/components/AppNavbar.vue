<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import image from '@/assets/profile_img_1.png'
import { useThemeStore } from '@/stores/themeStore'

defineOptions({
  name: 'AppNavbar',
})


const profileDropdownOpen = ref(false)
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

const toggleProfileDropdown = () => {
  profileDropdownOpen.value = !profileDropdownOpen.value
}


const closeDropdown = () => {
  profileDropdownOpen.value = false
}

const handleLogout = () => {
  closeDropdown()
}

// const currentPageName = computed(() => {
//   const current = menuItems.find((item) => item.path === route.path);
//   return current ? current.name : "Dashboard";
// });
</script>

<template>
  <nav
    class="sticky top-0 z-40 flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-200 p-4 text-slate-900 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
  >
    <h1 class="text-xl font-bold">Unassigned Tickets</h1>

    <div class="relative flex items-center">
      <button
        type="button"
        class="mr-3 flex items-center justify-center text-slate-700 transition-colors dark:border-slate-600 dark:bg-slate-800 dark:text-amber-300"
        @click="themeStore.toggleTheme"
      >
        <span v-if="!isDark" class="material-symbols-outlined">light_mode</span>
        <span v-else class="material-symbols-outlined">dark_mode</span>
      </button>

      <button
        class="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1 transition hover:bg-gray-100 dark:hover:bg-slate-800"
        @click="toggleProfileDropdown"
      >
        <img :src="image" alt="profile" class="h-10 w-10 rounded-full" />
        <div class="flex flex-col text-sm text-gray-600 dark:text-slate-300"></div>
      </button>

      <div
        v-if="profileDropdownOpen"
        class="absolute right-0 top-15 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800"
      >
        <div class="py-2">
          <button
            class="flex w-full items-center gap-2 px-4 py-2 text-left transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700"
            @click="closeDropdown"
          >
            <span class="material-symbols-outlined text-lg">account_circle</span>
            <span>My Profile</span>
          </button>

          <button
            class="flex w-full items-center gap-2 px-4 py-2 text-left transition hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700"
            @click="closeDropdown"
          >
            <span class="material-symbols-outlined text-lg">settings</span>
            <span>Settings</span>
          </button>

          <button
            class="flex w-full items-center gap-2 px-4 py-2 text-left font-semibold text-red-600 transition hover:bg-red-50"
            @click="handleLogout"
          >
            <span class="material-symbols-outlined text-lg">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
