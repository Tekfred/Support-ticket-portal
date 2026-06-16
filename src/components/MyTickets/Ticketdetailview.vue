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
    case 'Pending':   return 'bg-violet-50 text-violet-600 border border-violet-100'
    case 'On-Hold':   return 'bg-amber-50 text-amber-600 border border-amber-100'
    case 'Candidate': return 'bg-indigo-50 text-indigo-700 border border-indigo-100'
    case 'Resolved':  return 'bg-emerald-50 text-emerald-700 border border-emerald-100'
    default:          return 'bg-slate-50 text-slate-600'
  }
}

function getPriorityStyle(p) {
  switch (p) {
    case 'critical': return 'bg-red-500 text-white font-bold ring-4 ring-red-500/10'
    case 'high':     return 'bg-rose-100 text-rose-700 font-semibold'
    case 'medium':   return 'bg-amber-100 text-amber-800 font-semibold'
    case 'low':      return 'bg-slate-100 text-slate-700 font-medium'
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
        class="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm transition-all cursor-pointer"
      >
        <ArrowLeft class="h-4 w-4" />
        Back to Workspace
      </button>

      <div class="flex items-center gap-2">
        <span class="text-xs text-slate-400 font-medium">Assigned Agent:</span>
        <span class="text-xs bg-slate-900 text-white font-mono px-2.5 py-1 rounded-lg">
          {{ ticket.acceptedBy }}
        </span>
      </div>
    </div>

    <!-- Two-Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- LEFT: Ticket Detail + Comment Feed -->
      <div class="lg:col-span-2 space-y-6">

        <!-- Company Profile Card -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          <!-- Header Row -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div class="flex items-center gap-4">
              <div class="h-14 w-14 bg-linear-to-tr from-indigo-600 to-violet-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0">
                {{ ticket.company.substring(0, 2).toUpperCase() }}
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h2 class="text-2xl font-display font-bold text-slate-900 leading-tight">
                    {{ ticket.company }}
                  </h2>
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-bold" :class="getStatusStyle(ticket.status)">
                    {{ ticket.status }}
                  </span>
                </div>
                <p class="text-sm text-slate-500 font-medium mt-1">
                  {{ ticket.category }} •
                  <span class="text-indigo-600 font-semibold font-mono">ID: #{{ ticket.id }}</span>
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
              <h4 class="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">Target Application Role</h4>
              <p class="text-lg font-semibold text-slate-800 font-display">{{ ticket.position }}</p>
            </div>

            <div class="border-t border-slate-100 pt-4">
              <h4 class="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">Issue / Job Overview</h4>
              <div class="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-100 whitespace-pre-wrap">
                {{ ticket.description }}
              </div>
            </div>

            <!-- Meta Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div>
                <span class="text-slate-400 block">Department</span>
                <span class="font-bold text-slate-700 mt-1 block">{{ ticket.department }}</span>
              </div>
              <div>
                <span class="text-slate-400 block">Filing Timestamp</span>
                <span class="text-slate-500 mt-1 font-mono block">{{ ticket.appliedDate }}</span>
              </div>
              <div>
                <span class="text-slate-400 block">Contract Format</span>
                <span class="font-semibold bg-gray-100 text-gray-800 px-2 py-0.5 rounded inline-block mt-1">
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
