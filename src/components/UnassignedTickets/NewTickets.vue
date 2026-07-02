<script setup>
import { computed } from 'vue'
import { Clock } from 'lucide-vue-next'

const props = defineProps({
  tickets: { type: Array, required: true },
  activeFilter: { type: String, required: true },
  searchQuery: { type: String, required: true },
  sortBy: { type: String, required: true },
  itemsPerPage: { type: Number, default: 3 }
})

const unassignedTickets = computed(() => props.tickets.filter(t => !t.acceptedBy))

const filtered = computed(() => {
  return unassignedTickets.value.filter(ticket => {
    const matchesStatus = props.activeFilter === 'All' ? true : ticket.status === props.activeFilter
    const q = props.searchQuery.toLowerCase()
    const matchesSearch = !q || [ticket.company, ticket.position, ticket.id, ticket.description, ticket.category].some(s => String(s).toLowerCase().includes(q))
    return matchesStatus && matchesSearch
  })
})

const sorted = computed(() => {
  return [...filtered.value].sort((a,b)=>{
    if(props.sortBy === 'newest') return b.id.localeCompare(a.id)
    if(props.sortBy === 'oldest') return a.id.localeCompare(b.id)
    if(props.sortBy === 'company') return a.company.localeCompare(b.company)
    if(props.sortBy === 'priority'){
      const w = { critical:4, high:3, medium:2, low:1 }
      return (w[b.priority]||0) - (w[a.priority]||0)
    }
    return 0
  })
})

const recent = computed(()=> sorted.value.slice(0, props.itemsPerPage))

function getAvatarInitials(comp){ if(!comp) return '?'; return comp.split(' ')[0][0].toUpperCase() }
function getAvatarBackground(comp){ const char = getAvatarInitials(comp); const code = char.charCodeAt(0) || 0; if(code % 3 === 0) return 'bg-orange-500 text-white'; if(code % 3 === 1) return 'bg-slate-700 text-white'; return 'bg-indigo-600 text-white'; }
</script>

<template>
  <div class="space-y-3">
    <h2 class="text-lg font-semibold dark:text-slate-100">New Tickets</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div v-for="t in recent" :key="t.id" class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start gap-3 transition-colors">
        <div class="h-10 w-10 rounded-lg flex items-center justify-center font-bold" :class="getAvatarBackground(t.company)">{{ getAvatarInitials(t.company) }}</div>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-bold dark:text-slate-100">{{ t.company }}</div>
              <div class="text-xs text-slate-500 dark:text-slate-400">{{ t.position }}</div>
            </div>
            <div class="text-xs text-slate-400 dark:text-slate-500 font-mono">#{{ t.id }}</div>
          </div>
          <div class="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Clock class="h-3.5 w-3.5" />
            <span>{{ t.appliedDate }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
