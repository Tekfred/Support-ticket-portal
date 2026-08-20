<script setup>
import { Check, Mail, Phone } from 'lucide-vue-next'

defineOptions({
  name: 'ResolutionPanel',
})

defineProps({
  ticket: { type: Object, required: true },
})

const emit = defineEmits(['updateStatus', 'updatePriority', 'updateDept', 'release'])
</script>

<template>
  <div class="space-y-6">

    <!-- Resolution Workstation -->
    <div class="bg-[#090d16] text-white rounded-2xl p-6 space-y-6 shadow-xl shadow-black/30 border border-slate-800 relative overflow-hidden text-left">
      <!-- Glow accent -->
      <div class="absolute top-0 right-0 h-40 w-40 bg-linear-to-tr from-violet-600 to-indigo-500 opacity-10 rounded-full blur-2xl" />

      <h3 class="heading-sm font-display font-semibold border-b border-slate-800 pb-3 flex items-center gap-1.5 relative z-10 text-white">
        <Check class="h-4 w-4 text-emerald-400" />
        Resolution Workstation
      </h3>

      <!-- Status Buttons -->
      <div class="space-y-2 relative z-10 text-xs">
        <label class="block text-label font-bold mb-2 font-mono">Set Ticket Status</label>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="st in ['Pending', 'On-Hold', 'Candidate', 'Resolved']"
            :key="st"
            @click="emit('updateStatus', st)"
            class="p-2.5 rounded-xl font-bold flex items-center justify-between text-left border cursor-pointer transition-all border-slate-800"
            :class="[
              st === ticket.status
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-slate-800/60 hover:border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
            ]"
          >
            <span>{{ st }}</span>
            <Check v-if="st === ticket.status" class="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <!-- Priority Buttons -->
      <div class="space-y-1.5 relative z-10 text-xs text-left">
        <label class="block text-label font-bold mb-2 font-mono">Urgency Level</label>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="pr in ['low', 'medium', 'high', 'critical']"
            :key="pr"
            @click="emit('updatePriority', pr)"
            class="p-2.5 rounded-xl font-bold text-center border capitalize transition-all cursor-pointer border-slate-800"
            :class="[
              pr === ticket.priority
                ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-800/65 hover:border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
            ]"
          >
            {{ pr }}
          </button>
        </div>
      </div>

      <!-- Department Dropdown -->
      <div class="space-y-2 relative z-10 text-left text-xs">
        <label class="block text-label font-bold mb-2 font-mono">Routing Department</label>
        <select
          :value="ticket.department"
          @change="emit('updateDept', $event.target.value)"
          class="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Technical Operations">Technical Operations</option>
          <option value="Security & Infrastructure">Security & Infrastructure</option>
          <option value="Customer Support Desk">Customer Support Desk</option>
        </select>
      </div>

      <!-- Release Button -->
      <div class="pt-4 border-t border-slate-800 space-y-3 relative z-10">
        <p class="text-subtle leading-relaxed font-sans">
          Need to dispatch this ticket back to the shared queue? Releasing it makes it available to other support crew.
        </p>
        <button
          @click="emit('release', ticket.id)"
          class="w-full py-2.5 bg-slate-800 hover:bg-red-950/20 text-slate-300 hover:text-red-400 hover:border-red-900 border border-slate-800 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200"
        >
          Release to Unassigned Pool
        </button>
      </div>
    </div>

    <!-- Customer Contact Card -->
    <div class="surface-card rounded-2xl p-6 text-left space-y-4">
      <h3 class="text-label font-bold uppercase tracking-wider font-mono">Customer Contact Card</h3>
      <div class="space-y-3 text-xs leading-relaxed">
        <div class="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
          <Mail class="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
          <a :href="`mailto:${ticket.email}`" class="hover:underline hover:text-indigo-600 dark:hover:text-indigo-400 truncate">
            {{ ticket.email }}
          </a>
        </div>
        <div class="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
          <Phone class="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
          <a :href="`tel:${ticket.phone}`" class="hover:underline hover:text-indigo-600 dark:hover:text-indigo-400">
            {{ ticket.phone }}
          </a>
        </div>
      </div>
    </div>

  </div>
</template>
