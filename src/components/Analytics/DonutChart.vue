<script setup>
defineProps({
  donutSlices: { type: Array, required: true },
  totalTasks: { type: Number, default: 0 }
})
</script>

<template>
  <div class="flex flex-col justify-between p-5 text-left bg-white border shadow-sm rounded-2xl border-slate-200 md:p-6">
    <div>
      <h3 class="text-base font-bold text-slate-900 font-display">Backlog Status Shares</h3>
      <p class="mt-1 text-xs font-medium tracking-tight uppercase text-slate-400 font-display">Backlog Channels Status Ratio</p>
    </div>

    <div class="relative flex items-center justify-center h-44">
      <svg width="140" height="140" viewBox="0 0 120 120" class="transform -rotate-90">
        <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" stroke-width="11" />
        <circle
          v-for="slice in donutSlices"
          :key="slice.name"
          cx="60" cy="60" r="50"
          fill="none"
          :stroke="slice.color"
          stroke-width="11"
          :stroke-dasharray="slice.dashArray"
          :stroke-dashoffset="slice.strokeDashoffset"
          stroke-linecap="round"
          class="transition-all duration-300"
        />
      </svg>
      <div class="absolute flex flex-col items-center">
        <span class="font-mono text-2xl font-extrabold text-slate-800">{{ totalTasks }}</span>
        <span class="text-[9px] text-slate-400 uppercase font-bold tracking-widest mt-0.5">Total tasks</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2 text-[10px] font-semibold mt-3">
      <div
        v-for="item in donutSlices"
        :key="item.name"
        class="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50 border border-slate-100"
      >
        <div class="w-2 h-2 rounded-full shrink-0" :style="{ backgroundColor: item.color }" />
        <span class="truncate text-slate-600 font-display">{{ item.name }} ({{ item.value }})</span>
      </div>
    </div>
  </div>
</template>
