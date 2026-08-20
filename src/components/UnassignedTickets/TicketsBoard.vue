<script setup>
import { computed, ref } from 'vue'
import { Clock, Phone, Mail, MoreVertical, UserPlus, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  tickets: { type: Array, required: true },
  viewMode: { type: String, required: true },
  currentPage: { type: Number, required: true },
  itemsPerPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})

const emit = defineEmits(['acceptTicket','update:currentPage'])

const startIndex = computed(() => (props.currentPage - 1) * props.itemsPerPage)
const paginatedTickets = computed(() => props.tickets.slice(startIndex.value, startIndex.value + props.itemsPerPage))

const activeActionsId = ref(null)
function toggleActions(id){ activeActionsId.value = activeActionsId.value === id ? null : id }

function handleAccept(id){ emit('acceptTicket', id) }

function getAvatarInitials(comp){ if(!comp) return '?'; return comp.split(' ')[0][0].toUpperCase() }
function getAvatarBackground(comp){ const char = getAvatarInitials(comp); const code = char.charCodeAt(0) || 0; if(code % 3 === 0) return 'bg-orange-500 text-white'; if(code % 3 === 1) return 'bg-slate-700 text-white'; return 'bg-indigo-600 text-white'; }
function getStatusStyle(status){ switch(status){ case 'Pending': return 'status-pending'; case 'On-Hold': return 'status-hold'; case 'Candidate': return 'status-candidate'; case 'Resolved': return 'status-resolved'; default: return 'surface-soft text-slate-600 dark:text-slate-300'; } }
function getPriorityStyle(p){ switch(p){ case 'critical': return 'bg-red-500 text-white font-semibold shadow-sm shadow-red-500/20'; case 'high': return 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 dark:border dark:border-rose-800/60'; case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border dark:border-amber-800/60'; case 'low': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:border dark:border-slate-700'; } }

</script>

<template>
  <div>
    <div v-if="tickets.length === 0" class="h-96 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-900/60 dark:border-slate-800 transition-colors">
      <div class="text-slate-300 mb-3 dark:text-slate-600"><Clock class="h-12 w-12" /></div>
      <h3 class="heading-md text-slate-800 dark:text-slate-200">No support tickets found</h3>
      <p class="text-body max-w-sm mt-1">There are no unassigned tickets that match the filter criteria. Add a new ticket or adjust your filters.</p>
    </div>

    <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" id="tickets-gird">
      <div v-for="ticket in paginatedTickets" :key="ticket.id" class="surface-card surface-card-hover rounded-2xl p-5 flex flex-col relative group overflow-hidden">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="h-11 w-11 rounded-xl font-bold flex items-center justify-center text-sm shadow-md" :class="getAvatarBackground(ticket.company)">{{ getAvatarInitials(ticket.company) }}</div>
            <div>
               <h3 class="heading-sm text-slate-900 dark:text-slate-100 leading-none group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-display">{{ ticket.company }}</h3>
               <p class="text-subtle mt-1 font-medium leading-none">{{ ticket.category }}</p>
            </div>
          </div>

          <span class="px-2.5 py-1 rounded-full text-xs font-semibold" :class="getStatusStyle(ticket.status)">{{ ticket.status }}</span>
        </div>

        <div class="mb-4">
          <div class="flex items-center justify-between text-xs font-mono mb-2">
            <span class="text-indigo-600 dark:text-indigo-400 font-bold">ID: #{{ ticket.id }}</span>
            <span class="text-subtle">TYPE</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="heading-sm text-slate-800 dark:text-slate-200">{{ ticket.position }}</span>
            <span class="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">{{ ticket.type }}</span>
          </div>
        </div>

        <p class="text-subtle line-clamp-3 mb-5 leading-relaxed surface-soft p-2.5 rounded-lg">{{ ticket.description }}</p>

        <div class="mt-auto border-t border-slate-100 dark:border-slate-700 pt-4 flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-label leading-none">Applied</span>
              <span class="text-data-sm mt-1 font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1"><Clock class="h-3 w-3 text-slate-400 dark:text-slate-500" />{{ ticket.appliedDate }}</span>
            </div>

          <div class="flex items-center gap-2">
            <a :href="`tel:${ticket.phone}`" class="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors" :title="`Call ${ticket.company}`"><Phone class="h-3.5 w-3.5" /></a>
            <a :href="`mailto:${ticket.email}`" class="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors" :title="`Email ${ticket.company}`"><Mail class="h-3.5 w-3.5" /></a>

            <div class="relative">
              <button @click.stop.prevent="toggleActions(ticket.id)" class="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"><MoreVertical class="h-3.5 w-3.5" /></button>
              <div v-if="activeActionsId === ticket.id">
                <div class="fixed inset-0 z-10" @click="activeActionsId = null" />
                <div class="absolute right-0 bottom-full mb-2 w-44 surface-panel rounded-xl p-1.5 z-20 transition-colors">
                  <button @click="$emit('acceptTicket', ticket.id); activeActionsId = null;" class="w-full flex items-center gap-2 text-left text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 p-2.5 rounded-lg transition-colors cursor-pointer"><UserPlus class="h-3.5 w-3.5"/>Accept Ticket</button>
                  <div class="border-t border-slate-100 dark:border-slate-700 my-1" />
                  <div class="px-2 py-1 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">Priority: {{ ticket.priority }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div @click="handleAccept(ticket.id)" class="absolute inset-x-0 bottom-0 py-3 bg-indigo-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-xs tracking-wide cursor-pointer shadow-inner gap-1"><UserPlus class="h-3.5 w-3.5"/>ACCEPT AND CLAIM TICKET</div>
      </div>
    </div>

    <div v-else class="surface-card rounded-2xl overflow-hidden" id="tickets-list-layout">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse font-sans">
          <thead>
          <tr class="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 font-mono tracking-widest text-label font-bold">
            <th class="p-4 pl-6">Company</th>
            <th class="p-4">Ticket ID</th>
            <th class="p-4">Desired Position</th>
            <th class="p-4">Type</th>
            <th class="p-4">Priority</th>
            <th class="p-4">Status</th>
            <th class="p-4">Applied Date</th>
            <th class="p-4 pr-6 text-center">Actions</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
            <tr v-for="ticket in paginatedTickets" :key="ticket.id" class="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors group">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-3">
                  <div class="h-8 w-8 rounded-lg font-bold flex items-center justify-center text-xs shadow-sm" :class="getAvatarBackground(ticket.company)">{{ getAvatarInitials(ticket.company) }}</div>
                  <div>
                    <p class="font-bold text-slate-900 dark:text-slate-100 font-display">{{ ticket.company }}</p>
                    <p class="text-data-sm text-slate-400 dark:text-slate-500 mt-0.5">{{ ticket.category }}</p>
                  </div>
                </div>
              </td>
              <td class="p-4 font-mono font-semibold text-indigo-600 dark:text-indigo-400 text-data">#{{ ticket.id }}</td>
              <td class="p-4 text-slate-700 dark:text-slate-300 font-medium">{{ ticket.position }}</td>
              <td class="p-4"><span class="text-data font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-0.5 rounded">{{ ticket.type }}</span></td>
              <td class="p-4"><span class="px-2 py-0.5 rounded text-data-sm font-bold font-mono uppercase tracking-wider" :class="getPriorityStyle(ticket.priority)">{{ ticket.priority }}</span></td>
              <td class="p-4"><span class="px-2 py-0.5 rounded-full text-data font-semibold" :class="getStatusStyle(ticket.status)">{{ ticket.status }}</span></td>
              <td class="p-4 text-data text-slate-500 dark:text-slate-400">{{ ticket.appliedDate }}</td>
              <td class="p-4 pr-6 text-center"><button @click="$emit('acceptTicket', ticket.id)" class="opacity-100 md:opacity-0 group-hover:opacity-100 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-650 dark:hover:bg-indigo-900/50 text-indigo-600 hover:text-white dark:text-indigo-400 dark:hover:text-indigo-300 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 mx-auto cursor-pointer"><UserPlus class="h-3.5 w-3.5"/>Accept</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mt-8 flex items-center justify-between border-t border-slate-200/80 dark:border-slate-700 pt-6 font-sans">
      <button @click="$emit('update:currentPage', Math.max(currentPage - 1, 1))" :disabled="currentPage === 1" class="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"><ChevronLeft class="h-4 w-4"/>Previous</button>

      <div class="flex items-center gap-1.5 flex-wrap">
        <button v-for="(_, i) in totalPages" :key="i" @click="$emit('update:currentPage', i + 1)" class="h-9 w-9 text-data font-semibold rounded-lg flex items-center justify-center transition-all cursor-pointer" :class="[ i + 1 === currentPage ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-700']">{{ i + 1 }}</button>
      </div>

      <button @click="$emit('update:currentPage', Math.min(currentPage + 1, totalPages))" :disabled="currentPage === totalPages" class="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer">Next<ChevronRight class="h-4 w-4"/></button>
    </div>
  </div>
</template>
