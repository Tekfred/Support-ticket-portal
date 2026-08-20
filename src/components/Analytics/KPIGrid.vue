<script setup>
import { DollarSign, ShoppingBag, Activity, CheckCircle, ArrowUpRight, TrendingDown } from 'lucide-vue-next'

defineProps({
  totalEarnings:        { type: Number, required: true },
  totalBags:            { type: Number, required: true },
  openTicketsCount:     { type: Number, required: true },
  resolvedTicketsCount: { type: Number, required: true },
})
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" id="analytics-grid-widgets">

    <!-- Total Earnings -->
    <div class="flex flex-col justify-between p-6 transition-shadow bg-white border shadow-sm dark:bg-slate-800 rounded-2xl border-slate-200/80 dark:border-slate-700 hover:shadow-md">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-label">Total Earnings</p>
          <h3 class="mt-2 font-mono text-2xl font-extrabold font-display text-slate-800 dark:text-white">${{ totalEarnings.toFixed(2) }}</h3>
        </div>
        <div class="flex items-center justify-center w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl shrink-0">
          <DollarSign class="w-5 h-5" />
        </div>
      </div>
      <div class="flex items-center gap-2 mt-4 text-xs text-emerald-600 dark:text-emerald-400">
        <span class="bg-emerald-100 dark:bg-emerald-900/40 px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-0.5">
          <ArrowUpRight class="w-3 h-3" /> +7.2%
        </span>
        <span class="text-slate-400 dark:text-slate-500">v.s. yesterday</span>
      </div>
    </div>

    <!-- Luggage Items -->
    <div class="flex flex-col justify-between p-6 transition-shadow bg-white border shadow-sm dark:bg-slate-800 rounded-2xl border-slate-200/80 dark:border-slate-700 hover:shadow-md">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-label">Luggage Items</p>
          <h3 class="mt-2 font-mono text-2xl font-extrabold font-display text-slate-800 dark:text-white">{{ totalBags }} Bags</h3>
        </div>
        <div class="flex items-center justify-center w-12 h-12 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl shrink-0">
          <ShoppingBag class="w-5 h-5" />
        </div>
      </div>
      <div class="flex items-center gap-2 mt-4 text-xs text-indigo-600 dark:text-indigo-400">
        <span class="bg-indigo-50 dark:bg-indigo-900/40 px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-0.5">
          <ArrowUpRight class="w-3 h-3" /> +5.4%
        </span>
        <span class="text-slate-400 dark:text-slate-500">active storage depots</span>
      </div>
    </div>

    <!-- Open Backlog -->
    <div class="flex flex-col justify-between p-6 transition-shadow bg-white border shadow-sm dark:bg-slate-800 rounded-2xl border-slate-200/80 dark:border-slate-700 hover:shadow-md">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-label">Open Backlog</p>
          <h3 class="mt-2 font-mono text-2xl font-extrabold font-display text-slate-800 dark:text-white">{{ openTicketsCount }} Unassigned</h3>
        </div>
        <div class="flex items-center justify-center w-12 h-12 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-2xl shrink-0">
          <Activity class="w-5 h-5" />
        </div>
      </div>
      <div class="flex items-center gap-2 mt-4 text-xs text-rose-600 dark:text-rose-400">
        <span class="bg-rose-50 dark:bg-rose-900/40 px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-0.5">
          <TrendingDown class="w-3 h-3" /> -2.1%
        </span>
        <span class="text-slate-400 dark:text-slate-500">decrease this hour</span>
      </div>
    </div>

    <!-- Agent Resolved -->
    <div class="flex flex-col justify-between p-6 transition-shadow bg-white border shadow-sm dark:bg-slate-800 rounded-2xl border-slate-200/80 dark:border-slate-700 hover:shadow-md">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-label">Agent Resolved</p>
          <h3 class="mt-2 font-mono text-2xl font-extrabold font-display text-slate-800 dark:text-white">{{ resolvedTicketsCount }} Tickets</h3>
        </div>
        <div class="flex items-center justify-center w-12 h-12 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-2xl shrink-0">
          <CheckCircle class="w-5 h-5" />
        </div>
      </div>
      <div class="flex items-center gap-2 mt-4 text-xs text-emerald-600 dark:text-emerald-400">
        <span class="bg-emerald-50 dark:bg-emerald-900/40 px-1.5 py-0.5 rounded font-mono font-bold flex items-center gap-0.5">
          <ArrowUpRight class="w-3 h-3" /> +12.8%
        </span>
        <span class="text-slate-400 dark:text-slate-500">efficiency peak</span>
      </div>
    </div>

  </div>
</template>
