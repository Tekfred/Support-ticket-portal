<script setup>
import { computed } from 'vue';
import { useTicketStore } from '@/stores/ticketStore';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  Calendar, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  ArrowUpRight,
  TrendingDown,
  ShoppingBag,
  Bus,
  Sparkles
} from 'lucide-vue-next';

import HeaderBanner from '@/components/Analytics/HeaderBanner.vue'
import KPIGrid from '@/components/Analytics/KPIGrid.vue'
import AreaChart from '@/components/Analytics/AreaChart.vue'
import DonutChart from '@/components/Analytics/DonutChart.vue'
import ActivityFeed from '@/components/Analytics/ActivityFeed.vue'
import DepotBars from '@/components/Analytics/DepotBars.vue'

const props = defineProps({
  bookings: {
    type: Array,
    default: () => []
  },
  tickets: {
    type: Array,
    default: null
  }
});

// Use ticket store when tickets are not passed via props
const ticketStore = useTicketStore();
const ticketsRef = computed(() => props.tickets ?? ticketStore.tickets);
const bookingsRef = computed(() => props.bookings || []);

// Calculate dynamic metrics
const activeBookingsCount = computed(() => bookingsRef.value.filter(b => b.status === 'Active' || b.status === 'Checked in').length);
const totalEarnings = computed(() => bookingsRef.value.reduce((sum, b) => b.status !== 'Cancelled' ? sum + (b.earnings || 0) : sum, 0));
const totalBags = computed(() => bookingsRef.value.reduce((sum, b) => b.status !== 'Cancelled' ? sum + (b.bagsCount || 0) : sum, 0));
const resolvedTicketsCount = computed(() => ticketsRef.value.filter(t => t.status === 'Resolved').length);
const openTicketsCount = computed(() => ticketsRef.value.filter(t => !t.acceptedBy).length);

// Mock static data matching EasyBus ratios for rich trend visuals
const dynamicBookingTrend = [
  { hour: '08:00 AM', bookings: 12, tickets: 4 },
  { hour: '10:00 AM', bookings: 24, tickets: 8 },
  { hour: '12:00 PM', bookings: 45, tickets: 15 },
  { hour: '02:00 PM', bookings: 38, tickets: 11 },
  { hour: '04:00 PM', bookings: 56, tickets: 19 },
  { hour: '06:00 PM', bookings: 42, tickets: 14 }
];

// SVG telemetry layout calculations for the area chart (ViewBox: 0 0 600 240)
const width = 600;
const height = 245;
const paddingX = 45;
const paddingY = 25;

const trendPoints = computed(() => {
  const maxBooking = 60;
  const count = dynamicBookingTrend.length;
  
  const bookingsCoords = [];
  const ticketsCoords = [];
  
  dynamicBookingTrend.forEach((item, index) => {
    const x = paddingX + ((width - paddingX * 2) / (count - 1)) * index;
    // Map max value to height
    const bookingY = height - paddingY - ((height - paddingY * 2) / maxBooking) * item.bookings;
    const ticketY = height - paddingY - ((height - paddingY * 2) / maxBooking) * (item.tickets * 3); // Scaled for visual comparison
    
    bookingsCoords.push({ x, y: bookingY });
    ticketsCoords.push({ x, y: ticketY });
  });
  
  const createPath = (coords) => {
    if (coords.length === 0) return '';
    return coords.reduce((acc, point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`;
      return `${acc} L ${point.x} ${point.y}`;
    }, '');
  };

  const createClosedPath = (coords) => {
    if (coords.length === 0) return '';
    const linePath = createPath(coords);
    return `${linePath} L ${coords[coords.length - 1].x} ${height - paddingY} L ${coords[0].x} ${height - paddingY} Z`;
  };

  return {
    bookingsLine: createPath(bookingsCoords),
    bookingsArea: createClosedPath(bookingsCoords),
    ticketsLine: createPath(ticketsCoords),
    ticketsArea: createClosedPath(ticketsCoords),
    bookingsCoords,
    ticketsCoords
  };
});

// Bags handled by store depot code
const depotChartData = computed(() => {
  const map = {};
  bookingsRef.value.forEach(b => {
    if (b.status !== 'Cancelled') {
      map[b.storeCode] = (map[b.storeCode] || 0) + (b.bagsCount || 0);
    }
  });
  return Object.entries(map).map(([name, bags]) => ({ name, bags }));
});

const maxDepotBags = computed(() => {
  const values = depotChartData.value.map(d => d.bags);
  return Math.max(...values, 1);
});

// Ticket status distributions
const pendingCount = computed(() => ticketsRef.value.filter(t => t.status === 'Pending').length);
const onHoldCount = computed(() => ticketsRef.value.filter(t => t.status === 'On-Hold').length);
const candidateCount = computed(() => ticketsRef.value.filter(t => t.status === 'Candidate').length);
const resolvedCount = computed(() => ticketsRef.value.filter(t => t.status === 'Resolved').length);

const ticketStatusData = computed(() => [
  { name: 'Pending', value: pendingCount.value, color: '#8b5cf6', strokeClass: 'stroke-violet-500' },
  { name: 'On-Hold', value: onHoldCount.value, color: '#f59e0b', strokeClass: 'stroke-amber-500' },
  { name: 'Candidate', value: candidateCount.value, color: '#6366f1', strokeClass: 'stroke-indigo-500' },
  { name: 'Resolved', value: resolvedCount.value, color: '#10b981', strokeClass: 'stroke-emerald-500' }
]);

const donutSlices = computed(() => {
  const total = pendingCount.value + onHoldCount.value + candidateCount.value + resolvedCount.value;
  if (!total) return [];
  
  let currentOffset = 0;
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // 314.16
  
  return ticketStatusData.value.map(item => {
    const percentage = item.value / total;
    const dashArray = `${percentage * circumference} ${circumference}`;
    const strokeDashoffset = -currentOffset * circumference;
    currentOffset += percentage;
    return {
      ...item,
      dashArray,
      strokeDashoffset,
      percentage: Math.round(percentage * 100)
    };
  });
});

// Dynamic recent action timeline feed
const recentActivities = [
  {
    id: 'a1',
    title: 'Baggage Count modified',
    desc: 'Eleanor Pena added 1 luggage card bag on BOX-302',
    time: '12 mins ago',
    type: 'luggage'
  },
  {
    id: 'a2',
    title: 'Ticket Accepted',
    desc: 'M Mike claimed ticket APL-0003 for Mosciski Inc.',
    time: '34 mins ago',
    type: 'ticket'
  },
  {
    id: 'a3',
    title: 'New Storage Reservation',
    desc: 'Bessie Cooper stored 3 spinner cases on AFC-107',
    time: '45 mins ago',
    type: 'booking'
  },
  {
    id: 'a4',
    title: 'Terminal Routing Sync',
    desc: 'Systems escalated priority to critical for Sauer Group ticket',
    time: '1 hour ago',
    type: 'system'
  }
];

const getLogTypeColor = (type) => {
  switch (type) {
    case 'luggage': return 'bg-amber-100 text-amber-700';
    case 'ticket': return 'bg-indigo-100 text-indigo-700';
    case 'booking': return 'bg-emerald-100 text-emerald-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};
</script>

<template>
  <div class="flex-1 min-h-screen p-6 space-y-8 overflow-y-auto font-sans bg-slate-50 md:p-8" id="analytics-portal">
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

          <p class="mt-1 text-xs font-medium tracking-tight uppercase text-slate-400 font-display">Backlog Channels Status Ratio</p>
        </div>

        <!-- Custom SVG Donut representation -->
        <div class="relative flex items-center justify-center h-44">
          <svg width="140" height="140" viewBox="0 0 120 120" class="transform -rotate-90">
            <!-- Background base circle -->
            <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" stroke-width="11" />
            
            <!-- Segments -->
            <circle 
              v-for="slice in donutSlices" 
              :key="slice.name"
              cx="60" 
              cy="60" 
              r="50" 
              fill="none" 
              :stroke="slice.color" 
              stroke-width="11" 
              :stroke-dasharray="slice.dashArray"
              :stroke-dashoffset="slice.strokeDashoffset"
              stroke-linecap="round"
              class="transition-all duration-300"
            />
          </svg>
          
          <!-- Center counter badge -->
          <div class="absolute flex flex-col items-center">
            <span class="font-mono text-2xl font-extrabold text-slate-800">{{ ticketsRef.length }}</span>
            <span class="text-[9px] text-slate-400 uppercase font-bold tracking-widest mt-0.5">Total tasks</span>
          </div>
        </div>

        <!-- Legend indicator badges -->
        <div class="grid grid-cols-2 gap-2 text-[10px] font-semibold">
          <div v-for="item in donutSlices" :key="item.name" class="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-50 border border-slate-100">
            <div class="w-2 h-2 rounded-full shrink-0 animate-none" :style="{ backgroundColor: item.color }" />
            <span class="truncate text-slate-600 font-display">{{ item.name }} ({{ item.value }})</span>
          </div>
        </div>

      </div>

    </div>

    <div class="grid grid-cols-1 gap-6 pb-6 lg:grid-cols-2">
      <!-- Dynamic Activity Log stream -->
      <div class="flex flex-col justify-between p-6 text-left bg-white border shadow-sm rounded-2xl border-slate-200">
        <div class="mb-4">
          <h3 class="text-base font-bold text-slate-900 font-display">Live Telemetry Feed</h3>
          <p class="text-xs text-slate-400 mt-0.5">Real-time logs representing ongoing operations.</p>
        </div>

        <div class="flex-1 space-y-4">
          <div v-for="log in recentActivities" :key="log.id" class="flex items-start gap-3 p-3 transition-colors border border-transparent rounded-xl hover:bg-slate-50 hover:border-slate-100">
            <span class="px-2 py-1 rounded-lg text-[9px] font-bold font-mono uppercase tracking-wider shrink-0 mt-0.5" :class="getLogTypeColor(log.type)">
              {{ log.type }}
            </span>
            <div class="flex-1 space-y-0.5 font-sans">
              <h4 class="text-xs font-bold leading-none text-slate-800">{{ log.title }}</h4>
              <p class="text-[11px] text-slate-500 leading-normal">{{ log.desc }}</p>
            </div>
            <span class="text-[10px] font-mono text-slate-400 shrink-0">{{ log.time }}</span>
          </div>
        </div>
      </div>

      <!-- Depot capacity overview Bar chart -->
      <div class="flex flex-col justify-between p-6 text-left bg-white border shadow-sm rounded-2xl border-slate-200">
        <div class="mb-4">
          <h3 class="text-base font-bold text-slate-900 font-display">Bags Handled by Store Depot</h3>
          <p class="text-xs text-slate-400 mt-0.5 font-sans">Luggage volume allocation per box / depot code.</p>
        </div>

        <div v-if="depotChartData.length === 0" class="flex items-center justify-center font-sans text-xs italic h-44 text-slate-400">
          No storage allocation data. Add bags checks on booked workspace.
        </div>
        
        <div v-else class="space-y-3.5 flex-1 flex flex-col justify-center">
          <div v-for="(depot, index) in depotChartData" :key="depot.name" class="space-y-1">
            <div class="flex justify-between text-xs font-semibold text-slate-700">
              <span class="font-mono">DEPOT CODE: {{ depot.name }}</span>
              <span class="font-mono">{{ depot.bags }} Bag{{ depot.bags > 1 ? 's' : '' }}</span>
            </div>
            <div class="w-full bg-slate-150 bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                class="h-full transition-all duration-500 rounded-full"
                :class="[index % 2 === 0 ? 'bg-indigo-600' : 'bg-violet-500']"
                :style="`width: ${(depot.bags / maxDepotBags) * 100}%`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
