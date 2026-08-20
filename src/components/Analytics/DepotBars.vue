<script setup>
defineProps({
  depotChartData: { type: Array,  default: () => [] },
  maxDepotBags:   { type: Number, default: 1        },
})
</script>

<template>
  <div class="flex flex-col justify-between p-6 text-left bg-white border shadow-sm dark:bg-slate-800 rounded-2xl border-slate-200 dark:border-slate-700">
    <div class="mb-4">
      <h3 class="heading-md text-slate-900 dark:text-white font-display">Bags Handled by Store Depot</h3>
      <p class="text-subtle mt-0.5 font-sans">Luggage volume allocation per box / depot code.</p>
    </div>

    <div v-if="depotChartData.length === 0" class="flex items-center justify-center font-sans text-xs italic h-44 text-slate-400 dark:text-slate-500">
      No storage allocation data. Add bags checks on booked workspace.
    </div>

    <div v-else class="space-y-3.5 flex-1 flex flex-col justify-center">
      <div v-for="(depot, index) in depotChartData" :key="depot.name" class="space-y-1">
        <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span class="font-mono">DEPOT CODE: {{ depot.name }}</span>
          <span class="font-mono">{{ depot.bags }} Bag{{ depot.bags > 1 ? 's' : '' }}</span>
        </div>
        <div class="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
          <div
            class="h-full transition-all duration-500 rounded-full"
            :class="[index % 2 === 0 ? 'bg-indigo-600' : 'bg-violet-500']"
            :style="`width: ${(depot.bags / maxDepotBags) * 100}%`"
          />
        </div>
      </div>
    </div>
  </div>
</template>
