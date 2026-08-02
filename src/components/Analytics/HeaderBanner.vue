<script setup>
import { Clock } from 'lucide-vue-next'

defineProps({
  title:     { type: String, default: 'Dashboard Analytics' },
  subtitle:  { type: String, default: 'Real-time visual telemetry, occupancy rates, agent efficiency, and live backlog volume.' },
  syncLabel: { type: String, default: '● ACTIVE' },
  syncTime:  { type: String, default: new Date().toISOString().slice(0, 16).replace('T', ' ') },
})
</script>

<template>
  <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" id="analytics-header">
    <div>
      <h1 class="text-3xl font-bold tracking-tight font-display text-slate-900 dark:text-white">
        {{ title }}
      </h1>
      <p class="mt-1 font-display text-slate-500 dark:text-slate-400">{{ subtitle }}</p>
    </div>

    <div class="flex items-center gap-2 px-4 py-2.5 text-xs font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
      <Clock class="w-4 h-4 text-indigo-500" />
      <span class="text-slate-600 dark:text-slate-400">Sync Status:</span>
      <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ syncLabel }}</span>
      <span class="text-slate-300 dark:text-slate-600">|</span>
      <span class="font-semibold text-slate-500 dark:text-slate-400">{{ syncTime }}</span>
    </div>
  </div>
</template>
