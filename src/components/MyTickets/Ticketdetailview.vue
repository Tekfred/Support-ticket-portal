<script setup>
import { ArrowLeft } from 'lucide-vue-next'
import CommentFeed from './Commentfeed.vue'
import ResolutionPanel from './Resolutionpanel.vue'

defineOptions({ name: 'TicketDetailView' })

const props = defineProps({
  ticket: { type: Object, required: true },
})

const emit = defineEmits(['back', 'updateTicket', 'releaseTicket'])

function getStatusStyle(status) {
  switch (status) {
    case 'Pending':   return 'status-pending'
    case 'On-Hold':   return 'status-hold'
    case 'Candidate': return 'status-candidate'
    case 'Resolved':  return 'status-resolved'
    default:          return 'surface-soft text-slate-600 dark:text-slate-300'
  }
}

function getPriorityStyle(p) {
  switch (p) {
    case 'critical': return 'bg-red-500 text-white font-bold ring-4 ring-red-500/10'
    case 'high':     return 'bg-rose-100 text-rose-700 font-semibold dark:bg-rose-950/40 dark:text-rose-300 dark:border dark:border-rose-800/60'
    case 'medium':   return 'bg-amber-100 text-amber-800 font-semibold dark:bg-amber-950/40 dark:text-amber-300 dark:border dark:border-amber-800/60'
    case 'low':      return 'bg-slate-100 text-slate-700 font-medium dark:bg-slate-800 dark:text-slate-300 dark:border dark:border-slate-700'
  }
}

// Handlers — mutate and bubble up as full ticket objects
function handleAddComment(text) {
  const newComment = {
    id: `comment-${Date.now()}`,
    author: 'M Mike',
    text,
    date:
      new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ', ' +
      new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
  }
  emit('updateTicket', { ...props.ticket, comments: [...props.ticket.comments, newComment] })
}

function handleUpdateStatus(status) {
  emit('updateTicket', { ...props.ticket, status })
}

function handleUpdatePriority(priority) {
  emit('updateTicket', { ...props.ticket, priority })
}

function handleUpdateDept(department) {
  emit('updateTicket', { ...props.ticket, department })
}

function handleRelease(id) {
  emit('releaseTicket', id)
  emit('back')
}
</script>

<template>
  <div class="max-w-6xl mx-auto space-y-6" id="ticket-details-active-view">

    <!-- Top Nav Bar -->
    <div class="flex items-center justify-between">
      <button
        @click="emit('back')"
        class="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 surface-card px-4 py-2.5 rounded-xl transition-all cursor-pointer"
      >
        <ArrowLeft class="h-4 w-4" />
        Back to Workspace
      </button>

      <div class="flex items-center gap-2">
        <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">Assigned Agent:</span>
        <span class="text-xs bg-slate-900 dark:bg-slate-700 text-white dark:text-slate-100 font-mono px-2.5 py-1 rounded-lg">
          {{ ticket.acceptedBy }}
        </span>
      </div>
    </div>

    <!-- Two-Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- LEFT: Ticket Detail + Comment Feed -->
      <div class="lg:col-span-2 space-y-6">

        <!-- Company Profile Card -->
        <div class="surface-card rounded-2xl p-6 md:p-8">
          <!-- Header Row -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
            <div class="flex items-center gap-4">
              <div class="h-14 w-14 bg-linear-to-tr from-indigo-600 to-violet-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0">
                {{ ticket.company.substring(0, 2).toUpperCase() }}
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h2 class="text-2xl font-display font-bold text-slate-900 dark:text-slate-100 leading-tight">
                    {{ ticket.company }}
                  </h2>
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-bold" :class="getStatusStyle(ticket.status)">
                    {{ ticket.status }}
                  </span>
                </div>
                <p class="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  {{ ticket.category }} •
                  <span class="text-indigo-600 dark:text-indigo-400 font-semibold font-mono">ID: #{{ ticket.id }}</span>
                </p>
              </div>
            </div>
            <span class="px-3 py-1 rounded-lg text-xs font-bold uppercase shrink-0" :class="getPriorityStyle(ticket.priority)">
              {{ ticket.priority }} Priority
            </span>
          </div>

          <!-- Details Block -->
          <div class="space-y-4">
            <div>
              <h4 class="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-1">Target Application Role</h4>
              <p class="text-lg font-semibold text-slate-800 dark:text-slate-200 font-display">{{ ticket.position }}</p>
            </div>

            <div class="border-t border-slate-100 dark:border-slate-700 pt-4">
              <h4 class="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-2">Issue / Job Overview</h4>
              <div class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed surface-soft rounded-xl p-4 whitespace-pre-wrap">
                {{ ticket.description }}
              </div>
            </div>

            <!-- Meta Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs">
              <div>
                <span class="text-slate-400 dark:text-slate-500 block">Department</span>
                <span class="font-bold text-slate-700 dark:text-slate-300 mt-1 block">{{ ticket.department }}</span>
              </div>
              <div>
                <span class="text-slate-400 dark:text-slate-500 block">Filing Timestamp</span>
                <span class="text-slate-500 dark:text-slate-400 mt-1 font-mono block">{{ ticket.appliedDate }}</span>
              </div>
              <div>
                <span class="text-slate-400 dark:text-slate-500 block">Contract Format</span>
                <span class="font-semibold bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-300 px-2 py-0.5 rounded inline-block mt-1">
                  {{ ticket.type }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Comment Feed -->
        <CommentFeed
          :comments="ticket.comments"
          @addComment="handleAddComment"
        />
      </div>

      <!-- RIGHT: Controls Sidebar -->
      <div>
        <ResolutionPanel
          :ticket="ticket"
          @updateStatus="handleUpdateStatus"
          @updatePriority="handleUpdatePriority"
          @updateDept="handleUpdateDept"
          @release="handleRelease"
        />
      </div>
    </div>
  </div>
</template>
