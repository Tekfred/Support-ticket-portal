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
      return 'bg-violet-50 text-violet-600 border border-violet-100'
    case 'On-Hold':
      return 'bg-amber-50 text-amber-600 border border-amber-100'
    case 'Candidate':
      return 'bg-indigo-50 text-indigo-700 border border-indigo-100'
    case 'Resolved':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100'
    default:
      return 'bg-slate-50 text-slate-600'
  }
}

function getPriorityStyle(p) {
  switch (p) {
    case 'critical':
      return 'bg-red-500 text-white font-bold ring-4 ring-red-500/10'
    case 'high':
      return 'bg-rose-100 text-rose-700 font-semibold'
    case 'medium':
      return 'bg-amber-100 text-amber-800 font-semibold'
    case 'low':
      return 'bg-slate-100 text-slate-700 font-medium'
  }
}
</script>

<template>
  <!-- Empty State -->
  <div
    v-if="tickets.length === 0"
    class="h-96 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-900 shadow-sm transition-colors"
  >
    <Briefcase class="h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
    <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200 font-display">Your workspace is clear</h3>
    <p class="text-slate-500 dark:text-slate-400 max-w-sm mt-1 text-sm leading-relaxed">
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
      class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 transition-all duration-200 flex flex-col relative cursor-pointer"
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
              class="font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-none font-display"
            >
              {{ ticket.company }}
            </h3>
            <span
              class="text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-mono font-bold uppercase rounded px-1.5 py-0.5 mt-1.5 inline-block"
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
        <p class="font-display font-semibold text-slate-800 dark:text-slate-200 text-[15px] mt-0.5">
          {{ ticket.position }}
        </p>
      </div>

      <!-- Description snippet -->
      <p
        class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed bg-slate-50/50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700 flex-1 mb-5"
      >
        {{ ticket.description }}
      </p>

      <!-- Footer -->
      <div class="border-t border-slate-100 dark:border-slate-700 pt-4 flex items-center justify-between mt-auto text-xs">
        <div class="flex items-center text-slate-500 dark:text-slate-400 gap-1 font-mono text-[11px]">
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
