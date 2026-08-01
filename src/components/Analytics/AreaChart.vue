<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  dynamicBookingTrend: { type: Array, required: true },
  trendPoints: { type: Object, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  paddingX: { type: Number, required: true },
  paddingY: { type: Number, required: true }
})
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 lg:col-span-2 shadow-sm flex flex-col justify-between text-left">
    <div class="mb-4 select-none">
      <h3 class="text-base font-bold text-slate-900 font-display">Real-time Booking & Ticket Influx</h3>
      <p class="text-xs text-slate-400 font-sans">Chronological telemetry monitoring booking checks and support requirements.</p>
    </div>

    <div class="relative w-full overflow-hidden">
      <svg :viewBox="`0 0 ${width} ${height}`" class="w-full h-auto select-none overflow-visible">
        <line :x1="paddingX" :y1="paddingY" :x2="width - paddingX" :y2="paddingY" stroke="#f1f5f9" stroke-width="1" />
        <line :x1="paddingX" :y1="height / 2" :x2="width - paddingX" :y2="height / 2" stroke="#f1f5f9" stroke-width="1" />
        <line :x1="paddingX" :y1="height - paddingY" :x2="width - paddingX" :y2="height - paddingY" stroke="#e2e8f0" stroke-width="1.5" />

        <text :x="paddingX - 10" :y="paddingY + 3" fill="#94a3b8" font-size="9" text-anchor="end" font-family="monospace">56</text>
        <text :x="paddingX - 10" :y="height / 2 + 3" fill="#94a3b8" font-size="9" text-anchor="end" font-family="monospace">28</text>
        <text :x="paddingX - 10" :y="height - paddingY + 3" fill="#94a3b8" font-size="9" text-anchor="end" font-family="monospace">0</text>

        <defs>
          <linearGradient id="gradientBookings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.30"/>
            <stop offset="100%" stop-color="#4f46e5" stop-opacity="0.0"/>
          </linearGradient>
          <linearGradient id="gradientTickets" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.20"/>
            <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.0"/>
          </linearGradient>
        </defs>

        <path :d="trendPoints.bookingsArea" fill="url(#gradientBookings)" />
        <path :d="trendPoints.ticketsArea" fill="url(#gradientTickets)" />

        <path :d="trendPoints.bookingsLine" fill="none" stroke="#4f46e5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <path :d="trendPoints.ticketsLine" fill="none" stroke="#8b5cf6" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round" />

        <circle v-for="(point, i) in trendPoints.bookingsCoords" :key="`b-${i}`" :cx="point.x" :cy="point.y" r="4" fill="#ffffff" stroke="#4f46e5" stroke-width="2" />
        <circle v-for="(point, i) in trendPoints.ticketsCoords" :key="`t-${i}`" :cx="point.x" :cy="point.y" r="3.5" fill="#ffffff" stroke="#8b5cf6" stroke-width="1.5" />

        <text v-for="(item, i) in dynamicBookingTrend" :key="`lbl-${i}`" :x="paddingX + ((width - paddingX * 2) / (dynamicBookingTrend.length - 1)) * i" :y="height - 6" fill="#94a3b8" font-size="9" text-anchor="middle" font-family="monospace">{{ item.hour }}</text>
      </svg>
    </div>

    <div class="mt-4 flex items-center gap-4 text-xs select-none">
      <div class="flex items-center gap-1.5"><div class="h-3 w-3 bg-indigo-600 rounded-sm" /><span class="text-slate-600 font-medium">Storage Bookings (Max 56)</span></div>
      <div class="flex items-center gap-1.5"><div class="h-3 w-3 bg-violet-500 rounded-sm" /><span class="text-slate-600 font-medium">Support Backlog (Max 19)</span></div>
    </div>
  </div>
</template>
