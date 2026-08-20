<script setup>
import { Briefcase, Clock, ChevronRight } from 'lucide-vue-next'

defineOptions({ name: 'TicketsGrid' })

const { tickets } = defineProps({
  tickets: { type: Array, required: true },
})

const emit = defineEmits(['selectTicket'])

function getStatusStyle(status) {
  switch (status) {
    case 'Pending':
      return 'status-pending'
    case 'On-Hold':
      return 'status-hold'
    case 'Candidate':
      return 'status-candidate'
    case 'Resolved':
      return 'status-resolved'
    default:
      return 'surface-soft text-slate-600 dark:text-slate-300'
  }
}

function getPriorityStyle(p) {
  switch (p) {
    case 'critical':
      return 'bg-red-500 text-white font-bold ring-4 ring-red-500/10'
    case 'high':
      return 'bg-rose-100 text-rose-700 font-semibold dark:bg-rose-950/40 dark:text-rose-300 dark:border dark:border-rose-800/60'
    case 'medium':
      return 'bg-amber-100 text-amber-800 font-semibold dark:bg-amber-950/40 dark:text-amber-300 dark:border dark:border-amber-800/60'
    case 'low':
      return 'bg-slate-100 text-slate-700 font-medium dark:bg-slate-800 dark:text-slate-300 dark:border dark:border-slate-700'
  }
}
</script>

<template>
  <!-- Empty State -->
  <div
    v-if="tickets.length === 0"
    class="h-96 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-900/60 shadow-sm transition-colors"
  >
    <Briefcase class="h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
    <h3 class="heading-md text-slate-800 dark:text-slate-200 font-display">Your workspace is clear</h3>
    <p class="text-body max-w-sm mt-1">
      You have not accepted or claimed any open tickets. Move over to the
      <span class="font-bold text-indigo-600 dark:text-indigo-400">Unassigned Tickets</span> pool to accept items.
    </p>
  </div>

  <!-- Tickets Grid -->
  <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6" id="claimed-tickets-grid">
    <div
      v-for="ticket in tickets"
      :key="ticket.id"
      @click="emit('selectTicket', ticket.id)"
      class="group surface-card surface-card-hover rounded-2xl p-6 flex flex-col relative cursor-pointer"
    >
      <!-- Card Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-3">
          <div
            class="h-10 w-10 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold flex items-center justify-center text-sm shadow-inner shrink-0"
          >
            {{ ticket.company.substring(0, 2).toUpperCase() }}
          </div>
          <div>
             <h3
               class="heading-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-none font-display"
             >
               {{ ticket.company }}
             </h3>
             <span
               class="text-data-sm bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-mono font-bold uppercase rounded px-1.5 py-0.5 mt-1.5 inline-block"
             >
               ID: #{{ ticket.id }}
             </span>
          </div>
        </div>

        <!-- Status + Priority badges -->
        <div class="flex flex-col items-end gap-1.5">
          <span
            class="px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0"
            :class="getStatusStyle(ticket.status)"
          >
            {{ ticket.status }}
          </span>
          <span
            class="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase shrink-0"
            :class="getPriorityStyle(ticket.priority)"
          >
            {{ ticket.priority }}
          </span>
        </div>
      </div>

      <!-- Position -->
      <div class="mb-4">
         <p class="text-xs text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider">Requested Position</p>
         <p class="heading-sm text-slate-800 dark:text-slate-200 mt-0.5">
           {{ ticket.position }}
         </p>
      </div>

      <!-- Description snippet -->
      <p
        class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed surface-soft p-2.5 rounded-lg flex-1 mb-5"
      >
        {{ ticket.description }}
      </p>

      <!-- Footer -->
      <div class="border-t border-slate-100 dark:border-slate-700 pt-4 flex items-center justify-between mt-auto text-xs">
        <div class="flex items-center text-slate-500 dark:text-slate-400 gap-1 text-data-sm">
          <Clock class="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
          {{ ticket.appliedDate }}
        </div>
        <div
          class="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold group-hover:translate-x-1 transition-transform"
        >
          Detail Workspace
          <ChevronRight class="h-4 w-4" />
        </div>
      </div>
    </div>
  </div>
</template>
