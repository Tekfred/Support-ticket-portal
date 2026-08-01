<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  donutSlices: { type: Array, required: true },
  totalTasks: { type: Number, default: 0 }
})
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm flex flex-col justify-between text-left">
    <div>
      <h3 class="text-base font-bold text-slate-900 font-display">Backlog Status Shares</h3>
      <p class="text-xs text-slate-400 mt-1 uppercase font-display font-medium tracking-tight">Backlog Channels Status Ratio</p>
    </div>

    <div class="h-44 flex items-center justify-center relative">
      <svg width="140" height="140" viewBox="0 0 120 120" class="transform -rotate-90">
        <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" stroke-width="11" />
        <circle v-for="slice in donutSlices" :key="slice.name" cx="60" cy="60" r="50" fill="none" :stroke="slice.color" stroke-width="11" :stroke-dasharray="slice.dashArray" :stroke-dashoffset="slice.strokeDashoffset" stroke-linecap="round" class="transition-all duration-300" />
      </svg>
      <div class="absolute flex flex-col items-center">
        <span class="text-2xl font-extrabold text-slate-800 font-mono">{{ totalTasks }}</span>
        <span class="text-[9px] text-slate-400 uppercase font-bold tracking-widest mt-0.5">Total tasks</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2 text-[10px] font-semibold mt-3">
      <div v-for="item in donutSlices" :key="item.name" class="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50 border border-slate-100">
        <div class="h-2 w-2 rounded-full shrink-0 animate-none" :style="{ backgroundColor: item.color }" />
        <span class="text-slate-600 truncate font-display">{{ item.name }} ({{ item.value }})</span>
      </div>
    </div>
  </div>
</template>
