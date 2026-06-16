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
      <h1 class="text-3xl font-display font-bold text-slate-900 tracking-tight flex items-center gap-2">
        My Workspace
        <span class="text-sm bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-mono font-semibold ml-2">
          {{ tickets.length }} assigned
        </span>
      </h1>
      <p class="text-slate-500 mt-1 font-display">
        Manage tickets you accepted. Click on any ticket to view details, update status, and chat with customers.
      </p>
    </div>

    <!-- Stat Cards Row -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <!-- Claimed Queue -->
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-wider font-bold text-slate-400">Claimed Queue</p>
          <p class="text-2xl font-bold text-slate-800 mt-1">{{ tickets.length }} Tickets</p>
        </div>
        <div class="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-sm">
          {{ tickets.filter(t => t.status !== 'Resolved').length }}
        </div>
      </div>

      <!-- Critical Priority -->
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-wider font-bold text-slate-400">Critical Priority</p>
          <p class="text-2xl font-bold text-rose-600 mt-1">
            {{ tickets.filter(t => t.priority === 'critical').length }} Urgent
          </p>
        </div>
        <div class="h-10 w-10 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center">
          <ShieldAlert class="h-5 w-5" />
        </div>
      </div>

      <!-- Resolved Today -->
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-wider font-bold text-slate-400">Resolved Today</p>
          <p class="text-2xl font-bold text-emerald-600 mt-1">
            {{ tickets.filter(t => t.status === 'Resolved').length }} Done
          </p>
        </div>
        <div class="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
          <CheckSquare class="h-5 w-5" />
        </div>
      </div>
    </div>
  </div>
</template>
