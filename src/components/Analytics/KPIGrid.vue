<script setup>
import { defineProps } from 'vue'
import { DollarSign, ShoppingBag, Activity, CheckCircle, ArrowUpRight, TrendingDown } from 'lucide-vue-next'

const props = defineProps({
  totalEarnings: { type: Number, required: true },
  totalBags: { type: Number, required: true },
  openTicketsCount: { type: Number, required: true },
  resolvedTicketsCount: { type: Number, required: true }
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="analytics-grid-widgets">
    <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-wider font-bold text-slate-400">Total Earnings</p>
          <h3 class="text-3xl font-display font-extrabold text-slate-800 mt-2 font-mono">${{ totalEarnings.toFixed(2) }}</h3>
        </div>
        <div class="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-bold shrink-0">
          <DollarSign class="h-5 w-5" />
        </div>
      </div>
      <div class="mt-4 flex items-center gap-2 text-xs text-emerald-600">
        <span class="bg-emerald-100 px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-0.5"><ArrowUpRight class="h-3 w-3" /> +7.2%</span>
        <span class="text-slate-400">v.s. yesterday</span>
      </div>
    </div>

    <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-wider font-bold text-slate-400">Luggage Items</p>
          <h3 class="text-3xl font-display font-extrabold text-slate-800 mt-2 font-mono">{{ totalBags }} Bags</h3>
        </div>
        <div class="h-12 w-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
          <ShoppingBag class="h-5 w-5" />
        </div>
      </div>
      <div class="mt-4 flex items-center gap-2 text-xs text-indigo-600">
        <span class="bg-indigo-50 px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-0.5"><ArrowUpRight class="h-3 w-3" /> +5.4%</span>
        <span class="text-slate-400">active storage depots</span>
      </div>
    </div>

    <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-wider font-bold text-slate-400">Open Backlog</p>
          <h3 class="text-3xl font-display font-extrabold text-slate-800 mt-2 font-mono">{{ openTicketsCount }} Unassigned</h3>
        </div>
        <div class="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
          <Activity class="h-5 w-5 animate-none" />
        </div>
      </div>
      <div class="mt-4 flex items-center gap-2 text-xs text-rose-600">
        <span class="bg-rose-50 px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-0.5"><TrendingDown class="h-3 w-3" /> -2.1%</span>
        <span class="text-slate-400">decrease this hour</span>
      </div>
    </div>

    <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-wider font-bold text-slate-400">Agent Resolved</p>
          <h3 class="text-3xl font-display font-extrabold text-slate-800 mt-2 font-mono">{{ resolvedTicketsCount }} Tickets</h3>
        </div>
        <div class="h-12 w-12 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center shrink-0">
          <CheckCircle class="h-5 w-5" />
        </div>
      </div>
      <div class="mt-4 flex items-center gap-2 text-xs text-emerald-600">
        <span class="bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-0.5"><ArrowUpRight class="h-3 w-3" /> +12.8%</span>
        <span class="text-slate-400">efficiency peak</span>
      </div>
    </div>
  </div>
</template>
