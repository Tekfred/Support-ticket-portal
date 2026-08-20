<script setup>
defineProps({
  recentActivities: { type: Array, default: () => [] },
})

const getLogTypeColor = (type) => {
  switch (type) {
    case 'luggage': return 'bg-amber-100  dark:bg-amber-900/40  text-amber-700  dark:text-amber-400'
    case 'ticket':  return 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400'
    case 'booking': return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
    default:        return 'bg-slate-100  dark:bg-slate-700     text-slate-700  dark:text-slate-400'
  }
}
</script>

<template>
  <div class="flex flex-col justify-between p-6 text-left bg-white border shadow-sm dark:bg-slate-800 rounded-2xl border-slate-200 dark:border-slate-700">
    <div class="mb-4">
      <h3 class="heading-md text-slate-900 dark:text-white font-display">Live Telemetry Feed</h3>
      <p class="text-subtle mt-0.5">Real-time logs representing ongoing operations.</p>
    </div>

    <div class="flex-1 space-y-4">
      <div
        v-for="log in recentActivities"
        :key="log.id"
        class="flex items-start gap-3 p-3 transition-colors border border-transparent rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-slate-100 dark:hover:border-slate-700"
      >
        <span
          class="px-2 py-1 rounded-lg text-[9px] font-bold font-mono uppercase tracking-wider shrink-0 mt-0.5"
          :class="getLogTypeColor(log.type)"
        >{{ log.type }}</span>
        <div class="flex-1 space-y-0.5 font-sans">
          <h4 class="text-xs font-bold leading-none text-slate-800 dark:text-slate-100">{{ log.title }}</h4>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">{{ log.desc }}</p>
        </div>
        <span class="text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0">{{ log.time }}</span>
      </div>
    </div>
  </div>
</template>
