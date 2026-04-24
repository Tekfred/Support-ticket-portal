<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="flex min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
    <Sidebar />
    <div class="min-w-0 flex-1 bg-slate-100 transition-colors dark:bg-slate-950">
      <AppNavbar />
      <main class="min-w-0 flex-1 bg-slate-100 p-6 transition-colors dark:bg-slate-950">
        <slot />
      </main>
    </div>
  </div>
</template>
