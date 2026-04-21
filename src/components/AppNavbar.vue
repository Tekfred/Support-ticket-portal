<script setup>
import { ref } from 'vue'

import image from '@/assets/profile_img_1.png'

defineOptions({
  name: 'AppNavbar',
})

const profileDropdownOpen = ref(false)

const toggleProfileDropdown = () => {
  profileDropdownOpen.value = !profileDropdownOpen.value
}

const closeDropdown = () => {
  profileDropdownOpen.value = false
}

const handleLogout = () => {
  closeDropdown()
}
</script>

<template>
  <nav class="relative top-0 flex items-center justify-between border-slate-200 p-4 text-black bg-slate-200">

    <h1 class="text-xl font-bold">Unassigned Tickets</h1>

    <div class="relative">
      <button
        class="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1 transition hover:bg-gray-100"
        @click="toggleProfileDropdown"
      >
        <img :src="image" alt="profile" class="h-10 w-10 rounded-full" />
        <div class="flex flex-col text-sm text-gray-600">
        </div>
      </button>

      <div
        v-if="profileDropdownOpen"
        class="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg"
      >
        <div class="py-2">
          <button
            class="flex w-full items-center gap-2 px-4 py-2 text-left transition hover:bg-gray-100"
            @click="closeDropdown"
          >
            <span class="material-symbols-outlined text-lg">account_circle</span>
            <span>My Profile</span>
          </button>

          <button
            class="flex w-full items-center gap-2 px-4 py-2 text-left transition hover:bg-gray-100"
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
