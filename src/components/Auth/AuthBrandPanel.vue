<script setup>
import {
  LifeBuoy,
  Sparkles,
  ShieldCheck,
  ArrowRight
} from 'lucide-vue-next'

defineOptions({
  name: 'AuthBrandPanel',
})

const emit = defineEmits(['selectDemo'])

const demoAccounts = [
  {
    name: 'M Mike',
    email: 'ansahaudi86@gmail.com',
    role: 'Desk Agent',
    department: 'Customer Care & Logistics',
    initials: 'MM',
    badge: 'Primary Agent'
  },
  {
    name: 'Sarah Connor',
    email: 'sarah.c@veloport.io',
    role: 'Operations Lead',
    department: 'Luggage Storage Ops',
    initials: 'SC',
    badge: 'Supervisor'
  },
  {
    name: 'Alex Rivera',
    email: 'admin@veloport.io',
    role: 'System Administrator',
    department: 'Technical Support',
    initials: 'AR',
    badge: 'Admin'
  }
]

const selectDemo = (account) => {
  emit('selectDemo', account)
}
</script>

<template>
  <div class="flex flex-col justify-between p-8 border-b lg:col-span-5 bg-linear-to-br from-indigo-950/80 via-slate-900 to-slate-950 lg:p-10 lg:border-b-0 lg:border-r border-slate-800/80">
    <div>
      <div class="flex items-center gap-3 mb-6">
        <div class="flex items-center justify-center text-white bg-indigo-600 shadow-lg h-11 w-11 rounded-2xl shadow-indigo-600/30 ring-4 ring-indigo-500/10">
          <LifeBuoy class="w-6 h-6" />
        </div>
        <div>
          <h1 class="text-xl font-bold tracking-tight text-white font-display">VeloPort</h1>
          <p class="font-mono text-xs font-medium tracking-widest text-indigo-400 uppercase">Booking Support Console</p>
        </div>
      </div>

      <div class="mt-8 space-y-3">
        <h2 class="text-2xl font-bold leading-tight text-white font-display">
          Centralized Support & Luggage Logistics Portal
        </h2>
        <p class="text-xs leading-relaxed text-slate-400">
          Manage unassigned backlog tickets, claim customer inquiries, organize storage manifests, and monitor real-time performance metrics.
        </p>
      </div>
    </div>

    <div class="pt-6 mt-8 border-t border-slate-800/80">
      <div class="flex items-center gap-2 mb-3">
        <Sparkles class="w-4 h-4 text-amber-400" />
        <span class="text-xs font-semibold text-slate-300 font-display">1-Click Quick Demo Sign In</span>
      </div>

      <div class="space-y-2">
        <button
          v-for="demo in demoAccounts"
          :key="demo.email"
          @click="selectDemo(demo)"
          type="button"
          class="flex items-center justify-between w-full p-3 text-left transition duration-200 border cursor-pointer rounded-2xl bg-slate-800/50 hover:bg-indigo-950/50 border-slate-700/50 hover:border-indigo-500/50 group"
        >
          <div class="flex items-center gap-3 overflow-hidden">
            <div class="flex items-center justify-center w-8 h-8 text-xs font-bold text-indigo-300 border rounded-xl bg-indigo-600/30 shrink-0 border-indigo-500/30">
              {{ demo.initials }}
            </div>
            <div class="overflow-hidden">
              <p class="text-xs font-bold truncate transition-colors text-slate-200 group-hover:text-indigo-300">
                {{ demo.name }}
              </p>
              <p class="text-[10px] text-slate-400 truncate font-mono">
                {{ demo.email }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <span class="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {{ demo.badge }}
            </span>
            <ArrowRight class="h-3.5 w-3.5 text-slate-500 group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5" />
          </div>
        </button>
      </div>
    </div>

    <div class="mt-8 flex items-center gap-2 text-[10px] text-slate-500 font-mono">
      <ShieldCheck class="w-4 h-4 text-emerald-400 shrink-0" />
      <span>Secure AES-256 session encryption active.</span>
    </div>
  </div>
</template>
