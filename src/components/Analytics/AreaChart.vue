<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/themeStore'

defineProps({
  dynamicBookingTrend: { type: Array,  required: true },
  trendPoints:         { type: Object, required: true },
  width:               { type: Number, required: true },
  height:              { type: Number, required: true },
  paddingX:            { type: Number, required: true },
  paddingY:            { type: Number, required: true },
})

// SVG can't use Tailwind dark: classes on fill/stroke attributes directly,
// so we read isDark from the store and compute SVG colours reactively.
const themeStore = useThemeStore()
const gridColor     = computed(() => themeStore.isDark ? '#1e293b' : '#f1f5f9')
const baseLineColor = computed(() => themeStore.isDark ? '#334155' : '#e2e8f0')
const labelColor    = computed(() => themeStore.isDark ? '#475569' : '#94a3b8')
</script>

<template>
  <div class="flex flex-col justify-between p-5 text-left bg-white border shadow-sm dark:bg-slate-800 rounded-2xl border-slate-200 dark:border-slate-700 md:p-6 lg:col-span-2">
    <div class="mb-4 select-none">
      <h3 class="heading-md text-slate-900 dark:text-white font-display">Real-time Booking & Ticket Influx</h3>
      <p class="text-subtle">Chronological telemetry monitoring booking checks and support requirements.</p>
    </div>

    <div class="relative w-full overflow-hidden">
      <svg :viewBox="`0 0 ${width} ${height}`" class="w-full h-auto overflow-visible select-none">
        <!-- Grid lines -->
        <line :x1="paddingX" :y1="paddingY"          :x2="width - paddingX" :y2="paddingY"          :stroke="gridColor"     stroke-width="1"   />
        <line :x1="paddingX" :y1="height / 2"        :x2="width - paddingX" :y2="height / 2"        :stroke="gridColor"     stroke-width="1"   />
        <line :x1="paddingX" :y1="height - paddingY" :x2="width - paddingX" :y2="height - paddingY" :stroke="baseLineColor" stroke-width="1.5" />

        <!-- Y-axis labels -->
        <text :x="paddingX - 10" :y="paddingY + 3"          :fill="labelColor" font-size="9" text-anchor="end" font-family="monospace">56</text>
        <text :x="paddingX - 10" :y="height / 2 + 3"        :fill="labelColor" font-size="9" text-anchor="end" font-family="monospace">28</text>
        <text :x="paddingX - 10" :y="height - paddingY + 3" :fill="labelColor" font-size="9" text-anchor="end" font-family="monospace">0</text>

        <defs>
          <linearGradient id="gradientBookings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stop-color="#4f46e5" stop-opacity="0.30"/>
            <stop offset="100%" stop-color="#4f46e5" stop-opacity="0.0"/>
          </linearGradient>
          <linearGradient id="gradientTickets" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stop-color="#8b5cf6" stop-opacity="0.20"/>
            <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.0"/>
          </linearGradient>
        </defs>

        <!-- Areas -->
        <path :d="trendPoints.bookingsArea" fill="url(#gradientBookings)" />
        <path :d="trendPoints.ticketsArea"  fill="url(#gradientTickets)"  />

        <!-- Lines -->
        <path :d="trendPoints.bookingsLine" fill="none" stroke="#4f46e5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <path :d="trendPoints.ticketsLine"  fill="none" stroke="#8b5cf6" stroke-width="2.0" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Dots -->
        <circle v-for="(point, i) in trendPoints.bookingsCoords" :key="`b-${i}`" :cx="point.x" :cy="point.y" r="4"   fill="#ffffff" stroke="#4f46e5" stroke-width="2"   />
        <circle v-for="(point, i) in trendPoints.ticketsCoords"  :key="`t-${i}`" :cx="point.x" :cy="point.y" r="3.5" fill="#ffffff" stroke="#8b5cf6" stroke-width="1.5" />

        <!-- X-axis labels -->
        <text
          v-for="(item, i) in dynamicBookingTrend"
          :key="`lbl-${i}`"
          :x="paddingX + ((width - paddingX * 2) / (dynamicBookingTrend.length - 1)) * i"
          :y="height - 6"
          :fill="labelColor"
          font-size="9"
          text-anchor="middle"
          font-family="monospace"
        >{{ item.hour }}</text>
      </svg>
    </div>

    <div class="flex items-center gap-4 mt-4 text-xs select-none">
      <div class="flex items-center gap-1.5">
        <div class="w-3 h-3 bg-indigo-600 rounded-sm" />
        <span class="font-medium text-slate-600 dark:text-slate-400">Storage Bookings (Max 56)</span>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="w-3 h-3 rounded-sm bg-violet-500" />
        <span class="font-medium text-slate-600 dark:text-slate-400">Support Backlog (Max 19)</span>
      </div>
    </div>
  </div>
</template>
