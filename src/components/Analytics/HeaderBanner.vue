<script setup>
import { Clock } from 'lucide-vue-next'

defineProps({
  title: { type: String, default: 'Dashboard Analytics' },
  subtitle: {
    type: String,
    default: 'Real-time visual telemetry, occupancy rates, agent efficiency, and live backlog volume.',
  },
  syncLabel: { type: String, default: '● ACTIVE' },
  syncTime: { type: String, default: new Date().toISOString().slice(0, 16).replace('T', ' ') },
})
</script>

<template>
  <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" id="analytics-header">
    <div>
      <h1 class="text-3xl font-bold tracking-tight font-display text-slate-900">{{ title }}</h1>
      <p class="mt-1 text-slate-500 font-display">{{ subtitle }}</p>
    </div>

    <div class="text-xs bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 font-mono">
      <Clock class="w-4 h-4 text-indigo-500" />
      <span>Sync Status: </span>
      <span class="font-bold text-emerald-600">{{ syncLabel }}</span>
      <span class="text-slate-400">|</span>
      <span class="font-semibold text-slate-500">{{ syncTime }}</span>
    </div>
  </div>
</template>
