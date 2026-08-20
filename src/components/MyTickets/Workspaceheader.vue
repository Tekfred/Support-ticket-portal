<script setup>
import { ShieldAlert, CheckSquare } from 'lucide-vue-next'

defineOptions({
  name: 'WorkspaceHeader',
})

const { tickets } = defineProps({
  tickets: { type: Array, required: true },
})
</script>

<template>
  <div class="space-y-4">
    <!-- Page Title -->
    <div>
      <h1 class="heading-xl text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
        My Workspace
        <span class="text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 px-3 py-1 rounded-full font-mono font-semibold ml-2">
          {{ tickets.length }} assigned
        </span>
      </h1>
      <p class="text-body mt-1">
        Manage tickets you accepted. Click on any ticket to view details, update status, and chat with customers.
      </p>
    </div>

    <!-- Stat Cards Row -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <!-- Claimed Queue -->
      <div class="surface-card p-4 rounded-xl flex items-center justify-between">
        <div>
          <p class="text-label">Claimed Queue</p>
          <p class="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">{{ tickets.length }} Tickets</p>
        </div>
        <div class="h-10 w-10 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center font-bold text-sm">
          {{ tickets.filter(t => t.status !== 'Resolved').length }}
        </div>
      </div>

      <!-- Critical Priority -->
      <div class="surface-card p-4 rounded-xl flex items-center justify-between">
        <div>
          <p class="text-label">Critical Priority</p>
          <p class="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">
            {{ tickets.filter(t => t.priority === 'critical').length }} Urgent
          </p>
        </div>
        <div class="h-10 w-10 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg flex items-center justify-center">
          <ShieldAlert class="h-5 w-5" />
        </div>
      </div>

      <!-- Resolved Today -->
      <div class="surface-card p-4 rounded-xl flex items-center justify-between">
        <div>
          <p class="text-label">Resolved Today</p>
          <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {{ tickets.filter(t => t.status === 'Resolved').length }} Done
          </p>
        </div>
        <div class="h-10 w-10 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
          <CheckSquare class="h-5 w-5" />
        </div>
      </div>
    </div>
  </div>
</template>
