<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="min-w-0 flex-1">
      <AppNavbar />
      <main class="min-w-0 flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
