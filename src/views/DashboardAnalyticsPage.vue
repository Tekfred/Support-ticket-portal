<script setup>
import { computed } from 'vue'
import { useTicketStore } from '@/stores/ticketStore'
import { useBookingStore } from '@/stores/bookingStore'

import HeaderBanner from '@/components/Analytics/HeaderBanner.vue'
import KPIGrid from '@/components/Analytics/KPIGrid.vue'
import AreaChart from '@/components/Analytics/AreaChart.vue'
import DonutChart from '@/components/Analytics/DonutChart.vue'
import ActivityFeed from '@/components/Analytics/ActivityFeed.vue'
import DepotBars from '@/components/Analytics/DepotBars.vue'

// ── Stores (single source of truth — no props needed) ──────────────────
const ticketStore = useTicketStore()
const bookingStore = useBookingStore()

const ticketsRef  = computed(() => ticketStore.tickets)
const bookingsRef = computed(() => bookingStore.bookings)

// ── KPI Metrics ────────────────────────────────────────────────────────
const totalEarnings       = computed(() => bookingsRef.value.reduce((sum, b) => b.status !== 'Cancelled' ? sum + (b.earnings || 0) : sum, 0))
const totalBags           = computed(() => bookingsRef.value.reduce((sum, b) => b.status !== 'Cancelled' ? sum + (b.bagsCount || 0) : sum, 0))
const openTicketsCount    = computed(() => ticketsRef.value.filter(t => !t.acceptedBy).length)
const resolvedTicketsCount = computed(() => ticketsRef.value.filter(t => t.status === 'Resolved').length)

// ── Area Chart: static trend data + SVG coordinate calculations ────────
const dynamicBookingTrend = [
  { hour: '08:00 AM', bookings: 12, tickets: 4  },
  { hour: '10:00 AM', bookings: 24, tickets: 8  },
  { hour: '12:00 PM', bookings: 45, tickets: 15 },
  { hour: '02:00 PM', bookings: 38, tickets: 11 },
  { hour: '04:00 PM', bookings: 56, tickets: 19 },
  { hour: '06:00 PM', bookings: 42, tickets: 14 },
]

const width    = 600
const height   = 245
const paddingX = 45
const paddingY = 25

const trendPoints = computed(() => {
  const maxBooking = 60
  const count = dynamicBookingTrend.length
  const bookingsCoords = []
  const ticketsCoords  = []

  dynamicBookingTrend.forEach((item, index) => {
    const x = paddingX + ((width - paddingX * 2) / (count - 1)) * index
    const bookingY = height - paddingY - ((height - paddingY * 2) / maxBooking) * item.bookings
    const ticketY  = height - paddingY - ((height - paddingY * 2) / maxBooking) * (item.tickets * 3)
    bookingsCoords.push({ x, y: bookingY })
    ticketsCoords.push({ x, y: ticketY })
  })

  const createPath = (coords) =>
    coords.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '')

  const createClosedPath = (coords) => {
    if (!coords.length) return ''
    return `${createPath(coords)} L ${coords[coords.length - 1].x} ${height - paddingY} L ${coords[0].x} ${height - paddingY} Z`
  }

  return {
    bookingsLine:   createPath(bookingsCoords),
    bookingsArea:   createClosedPath(bookingsCoords),
    ticketsLine:    createPath(ticketsCoords),
    ticketsArea:    createClosedPath(ticketsCoords),
    bookingsCoords,
    ticketsCoords,
  }
})

// ── Depot bar chart ────────────────────────────────────────────────────
const depotChartData = computed(() => {
  const map = {}
  bookingsRef.value.forEach(b => {
    if (b.status !== 'Cancelled') {
      map[b.storeCode] = (map[b.storeCode] || 0) + (b.bagsCount || 0)
    }
  })
  return Object.entries(map).map(([name, bags]) => ({ name, bags }))
})

const maxDepotBags = computed(() => Math.max(...depotChartData.value.map(d => d.bags), 1))

// ── Donut chart ────────────────────────────────────────────────────────
const pendingCount   = computed(() => ticketsRef.value.filter(t => t.status === 'Pending').length)
const onHoldCount    = computed(() => ticketsRef.value.filter(t => t.status === 'On-Hold').length)
const candidateCount = computed(() => ticketsRef.value.filter(t => t.status === 'Candidate').length)
const resolvedCount  = computed(() => ticketsRef.value.filter(t => t.status === 'Resolved').length)

const donutSlices = computed(() => {
  const total = pendingCount.value + onHoldCount.value + candidateCount.value + resolvedCount.value
  if (!total) return []

  const statusData = [
    { name: 'Pending',   value: pendingCount.value,   color: '#8b5cf6' },
    { name: 'On-Hold',   value: onHoldCount.value,    color: '#f59e0b' },
    { name: 'Candidate', value: candidateCount.value, color: '#6366f1' },
    { name: 'Resolved',  value: resolvedCount.value,  color: '#10b981' },
  ]

  const circumference = 2 * Math.PI * 50 // r=50 → 314.16
  let currentOffset = 0

  return statusData.map(item => {
    const percentage      = item.value / total
    const dashArray       = `${percentage * circumference} ${circumference}`
    const strokeDashoffset = -currentOffset * circumference
    currentOffset += percentage
    return { ...item, dashArray, strokeDashoffset, percentage: Math.round(percentage * 100) }
  })
})

// ── Activity feed (static demo data) ──────────────────────────────────
const recentActivities = [
  { id: 'a1', title: 'Baggage Count modified',   desc: 'Eleanor Pena added 1 luggage card bag on BOX-302',                   time: '12 mins ago', type: 'luggage' },
  { id: 'a2', title: 'Ticket Accepted',           desc: 'M Mike claimed ticket APL-0003 for Mosciski Inc.',                   time: '34 mins ago', type: 'ticket'  },
  { id: 'a3', title: 'New Storage Reservation',   desc: 'Bessie Cooper stored 3 spinner cases on AFC-107',                    time: '45 mins ago', type: 'booking' },
  { id: 'a4', title: 'Terminal Routing Sync',     desc: 'Systems escalated priority to critical for Sauer Group ticket',      time: '1 hour ago',  type: 'system'  },
]
</script>

<template>
  <div class="flex-1 min-h-screen p-6 space-y-8 overflow-y-auto font-sans md:p-8 bg-slate-50" id="analytics-portal">

    <HeaderBanner :syncTime="new Date().toLocaleString()" />

    <KPIGrid
      :totalEarnings="totalEarnings"
      :totalBags="totalBags"
      :openTicketsCount="openTicketsCount"
      :resolvedTicketsCount="resolvedTicketsCount"
    />

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3" id="analytics-charts-grid">
      <AreaChart
        :dynamicBookingTrend="dynamicBookingTrend"
        :trendPoints="trendPoints"
        :width="width"
        :height="height"
        :paddingX="paddingX"
        :paddingY="paddingY"
      />
      <DonutChart :donutSlices="donutSlices" :totalTasks="ticketsRef.length" />
    </div>

    <div class="grid grid-cols-1 gap-6 pb-6 lg:grid-cols-2">
      <ActivityFeed :recentActivities="recentActivities" />
      <DepotBars :depotChartData="depotChartData" :maxDepotBags="maxDepotBags" />
    </div>

  </div>
</template>
