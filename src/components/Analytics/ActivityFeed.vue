<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  recentActivities: { type: Array, default: () => [] }
})

const getLogTypeColor = (type) => {
  switch (type) {
    case 'luggage': return 'bg-amber-100 text-amber-700';
    case 'ticket': return 'bg-indigo-100 text-indigo-700';
    case 'booking': return 'bg-emerald-100 text-emerald-700';
    default: return 'bg-slate-100 text-slate-700';
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200 p-6 text-left shadow-sm flex flex-col justify-between">
    <div class="mb-4">
      <h3 class="text-base font-bold text-slate-900 font-display">Live Telemetry Feed</h3>
      <p class="text-xs text-slate-400 mt-0.5">Real-time logs representing ongoing operations.</p>
    </div>

    <div class="space-y-4 flex-1">
      <div v-for="log in recentActivities" :key="log.id" class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
        <span class="px-2 py-1 rounded-lg text-[9px] font-bold font-mono uppercase tracking-wider shrink-0 mt-0.5" :class="getLogTypeColor(log.type)">{{ log.type }}</span>
        <div class="flex-1 space-y-0.5 font-sans">
          <h4 class="text-xs font-bold text-slate-800 leading-none">{{ log.title }}</h4>
          <p class="text-[11px] text-slate-500 leading-normal">{{ log.desc }}</p>
        </div>
        <span class="text-[10px] font-mono text-slate-400 shrink-0">{{ log.time }}</span>
      </div>
    </div>
  </div>
</template>
