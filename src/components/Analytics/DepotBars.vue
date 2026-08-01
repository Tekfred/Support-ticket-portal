<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  depotChartData: { type: Array, default: () => [] },
  maxDepotBags: { type: Number, default: 1 }
})
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200 p-6 text-left shadow-sm flex flex-col justify-between">
    <div class="mb-4">
      <h3 class="text-base font-bold text-slate-900 font-display">Bags Handled by Store Depot</h3>
      <p class="text-xs text-slate-400 mt-0.5 font-sans">Luggage volume allocation per box / depot code.</p>
    </div>

    <div v-if="depotChartData.length === 0" class="h-44 flex items-center justify-center text-xs text-slate-400 italic font-sans">
      No storage allocation data. Add bags checks on booked workspace.
    </div>
    
    <div v-else class="space-y-3.5 flex-1 flex flex-col justify-center">
      <div v-for="(depot, index) in depotChartData" :key="depot.name" class="space-y-1">
        <div class="flex justify-between text-xs font-semibold text-slate-700">
          <span class="font-mono">DEPOT CODE: {{ depot.name }}</span>
          <span class="font-mono">{{ depot.bags }} Bag{{ depot.bags > 1 ? 's' : '' }}</span>
        </div>
        <div class="w-full bg-slate-150 bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div class="h-full rounded-full transition-all duration-500" :class="[index % 2 === 0 ? 'bg-indigo-600' : 'bg-violet-500']" :style="`width: ${(depot.bags / maxDepotBags) * 100}%`" />
        </div>
      </div>
    </div>
  </div>
</template>
