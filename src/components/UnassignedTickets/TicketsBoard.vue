<script setup>
import { computed } from 'vue'
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

function getAvatarInitials(comp){ if(!comp) return '?'; return comp.split(' ')[0][0].toUpperCase() }
function getAvatarBackground(comp){ const char = getAvatarInitials(comp); const code = char.charCodeAt(0) || 0; if(code % 3 === 0) return 'bg-orange-500 text-white'; if(code % 3 === 1) return 'bg-slate-700 text-white'; return 'bg-indigo-600 text-white'; }
function getStatusStyle(status){ switch(status){ case 'Pending': return 'bg-violet-50 text-violet-600 border border-violet-200'; case 'On-Hold': return 'bg-amber-50 text-amber-600 border border-amber-200'; case 'Candidate': return 'bg-indigo-50 text-indigo-700 border border-indigo-200'; case 'Resolved': return 'bg-emerald-50 text-emerald-700 border border-emerald-200'; default: return 'bg-slate-50 text-slate-600 border border-slate-200'; } }
function getPriorityStyle(p){ switch(p){ case 'critical': return 'bg-red-500 text-white font-semibold'; case 'high': return 'bg-rose-100 text-rose-700'; case 'medium': return 'bg-yellow-100 text-yellow-800'; case 'low': return 'bg-slate-100 text-slate-700'; } }

let activeActionsId = null
function toggleActions(id){ activeActionsId = activeActionsId === id ? null : id }
</script>

<template>
  <div>
    <div v-if="tickets.length === 0" class="h-96 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center bg-white">
      <div class="text-slate-300 mb-3"><Clock class="h-12 w-12" /></div>
      <h3 class="text-lg font-bold text-slate-800">No support tickets found</h3>
      <p class="text-slate-500 max-w-sm mt-1 text-sm">There are no unassigned tickets that match the filter criteria. Add a new ticket or adjust your filters.</p>
    </div>

    <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" id="tickets-gird">
      <div v-for="ticket in paginatedTickets" :key="ticket.id" class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col relative group overflow-hidden">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="h-11 w-11 rounded-xl font-bold flex items-center justify-center text-sm shadow-md" :class="getAvatarBackground(ticket.company)">{{ getAvatarInitials(ticket.company) }}</div>
            <div>
              <h3 class="font-bold text-slate-900 leading-none group-hover:text-indigo-600 transition-colors font-display">{{ ticket.company }}</h3>
              <p class="text-xs text-slate-500 mt-1 font-medium leading-none">{{ ticket.category }}</p>
            </div>
          </div>

          <span class="px-2.5 py-1 rounded-full text-xs font-semibold" :class="getStatusStyle(ticket.status)">{{ ticket.status }}</span>
        </div>

        <div class="mb-4">
          <div class="flex items-center justify-between text-xs font-mono mb-2">
            <span class="text-indigo-600 font-bold">ID: #{{ ticket.id }}</span>
            <span class="text-slate-400">TYPE</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="font-display font-medium text-slate-800 text-[15px]">{{ ticket.position }}</span>
            <span class="text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">{{ ticket.type }}</span>
          </div>
        </div>

        <p class="text-xs text-slate-500 line-clamp-3 mb-5 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">{{ ticket.description }}</p>

        <div class="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-[10px] text-slate-400 uppercase tracking-widest leading-none">Applied</span>
            <span class="text-xs font-medium text-slate-600 mt-1 font-mono flex items-center gap-1"><Clock class="h-3 w-3 text-slate-400" />{{ ticket.appliedDate }}</span>
          </div>

          <div class="flex items-center gap-2">
            <a :href="`tel:${ticket.phone}`" class="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition-colors" :title="`Call ${ticket.company}`"><Phone class="h-3.5 w-3.5" /></a>
            <a :href="`mailto:${ticket.email}`" class="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition-colors" :title="`Email ${ticket.company}`"><Mail class="h-3.5 w-3.5" /></a>

            <div class="relative">
              <button @click.stop.prevent="toggleActions(ticket.id)" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"><MoreVertical class="h-3.5 w-3.5" /></button>
              <div v-if="activeActionsId === ticket.id">
                <div class="fixed inset-0 z-10" @click="activeActionsId = null" />
                <div class="absolute right-0 bottom-full mb-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-20">
                  <button @click="$emit('acceptTicket', ticket.id); activeActionsId = null;" class="w-full flex items-center gap-2 text-left text-xs font-semibold text-emerald-700 hover:bg-emerald-50 p-2.5 rounded-lg transition-colors cursor-pointer"><UserPlus class="h-3.5 w-3.5"/>Accept Ticket</button>
                  <div class="border-t border-slate-100 my-1" />
                  <div class="px-2 py-1 text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Priority: {{ ticket.priority }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div @click="$emit('acceptTicket', ticket.id)" class="absolute inset-x-0 bottom-0 py-3 bg-indigo-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-xs tracking-wide cursor-pointer shadow-inner gap-1"><UserPlus class="h-3.5 w-3.5"/>ACCEPT AND CLAIM TICKET</div>
      </div>
    </div>

    <div v-else class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" id="tickets-list-layout">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse font-sans">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-200 text-slate-400 font-mono text-[10px] tracking-widest uppercase font-semibold">
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
          <tbody class="divide-y divide-slate-100 text-sm">
            <tr v-for="ticket in paginatedTickets" :key="ticket.id" class="hover:bg-slate-50/70 transition-colors group">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-3">
                  <div class="h-8 w-8 rounded-lg font-bold flex items-center justify-center text-xs shadow-sm" :class="getAvatarBackground(ticket.company)">{{ getAvatarInitials(ticket.company) }}</div>
                  <div>
                    <p class="font-bold text-slate-900 font-display">{{ ticket.company }}</p>
                    <p class="text-[10px] text-slate-400 mt-0.5">{{ ticket.category }}</p>
                  </div>
                </div>
              </td>
              <td class="p-4 font-mono font-semibold text-indigo-600 text-xs">#{{ ticket.id }}</td>
              <td class="p-4 text-slate-700 font-medium">{{ ticket.position }}</td>
              <td class="p-4"><span class="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded">{{ ticket.type }}</span></td>
              <td class="p-4"><span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider" :class="getPriorityStyle(ticket.priority)">{{ ticket.priority }}</span></td>
              <td class="p-4"><span class="px-2 py-0.5 rounded-full text-xs font-semibold" :class="getStatusStyle(ticket.status)">{{ ticket.status }}</span></td>
              <td class="p-4 font-mono text-xs text-slate-500">{{ ticket.appliedDate }}</td>
              <td class="p-4 pr-6 text-center"><button @click="$emit('acceptTicket', ticket.id)" class="opacity-100 md:opacity-0 group-hover:opacity-100 bg-indigo-50 hover:bg-indigo-650 text-indigo-600 hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 mx-auto cursor-pointer"><UserPlus class="h-3.5 w-3.5"/>Accept</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mt-8 flex items-center justify-between border-t border-slate-200/80 pt-6 font-sans">
      <button @click="$emit('update:currentPage', Math.max(currentPage - 1, 1))" :disabled="currentPage === 1" class="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 hover:bg-white text-slate-600 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"><ChevronLeft class="h-4 w-4"/>Previous</button>

      <div class="flex items-center gap-1.5 flex-wrap">
        <button v-for="(_, i) in totalPages" :key="i" @click="$emit('update:currentPage', i + 1)" class="h-9 w-9 text-xs font-semibold rounded-lg flex items-center justify-center transition-all cursor-pointer" :class="[ i + 1 === currentPage ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'hover:bg-white text-slate-600 border border-transparent hover:border-slate-200']">{{ i + 1 }}</button>
      </div>

      <button @click="$emit('update:currentPage', Math.min(currentPage + 1, totalPages))" :disabled="currentPage === totalPages" class="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 hover:bg-white text-slate-600 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer">Next<ChevronRight class="h-4 w-4"/></button>
    </div>
  </div>
</template>
