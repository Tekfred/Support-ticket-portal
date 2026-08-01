<script setup>
import { defineProps } from 'vue'
import { Clock } from 'lucide-vue-next'

const props = defineProps({
  title: { type: String, default: 'Dashboard Analytics' },
  subtitle: { type: String, default: 'Real-time visual telemetry, occupancy rates, agent efficiency, and live backlog volume.' },
  syncLabel: { type: String, default: '● ACTIVE' },
  syncTime: { type: String, default: new Date().toISOString().slice(0,16).replace('T',' ') }
})
</script>

<template>
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4" id="analytics-header">
    <div>
      <h1 class="text-3xl font-display font-bold text-slate-900 tracking-tight">{{ title }}</h1>
      <p class="text-slate-500 mt-1 font-display">{{ subtitle }}</p>
    </div>

    <div class="text-xs bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 font-mono">
      <Clock class="h-4 w-4 text-indigo-500" />
      <span>Sync Status: </span>
      <span class="text-emerald-600 font-bold">{{ syncLabel }}</span>
      <span class="text-slate-400">|</span>
      <span class="font-semibold text-slate-500">{{ syncTime }}</span>
    </div>
  </div>
</template>
