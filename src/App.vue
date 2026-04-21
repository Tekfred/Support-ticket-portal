<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <main class="min-w-0 flex-1 p-6">
      <RouterView />
    </main>
  </div>
</template>
