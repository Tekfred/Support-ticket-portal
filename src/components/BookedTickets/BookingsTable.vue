<script setup>
import { AlertCircle, ChevronRight } from 'lucide-vue-next'

defineOptions({ name: 'BookingsTable' })

defineProps({
  bookings: { type: Array, required: true },
  selectedBookingId: { type: String, default: null }
})

defineEmits(['selectBooking'])

const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700'
    case 'Checked in':
      return 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700'
    case 'Booked':
      return 'text-amber-700 dark:text-amber-400 bg-amber-50/70 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700'
    case 'Upcoming':
      return 'text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700'
    case 'Cancelled':
      return 'text-red-600 dark:text-red-400 bg-red-50/75 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
    default:
      return 'text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700'
  }
}
</script>

<template>
  <!-- Empty State -->
  <div v-if="bookings.length === 0" class="flex-1 py-16 text-center bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-8 transition-colors">
    <AlertCircle class="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
    <p class="text-sm font-bold text-slate-700 dark:text-slate-200">No storage manifests found</p>
    <p class="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs mx-auto">
      No bookings correspond to your query. Clear search or add a new record.
    </p>
  </div>

  <!-- Bookings Table -->
  <div v-else class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm flex-1 min-h-[300px] transition-colors">
    <div class="overflow-x-auto h-full">
      <table class="w-full text-left border-collapse font-sans text-xs" id="bookings-table">
        <thead>
          <tr class="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 font-mono tracking-widest text-[9px] uppercase font-bold">
            <th class="p-4 pl-6">Store / Code</th>
            <th class="p-4">Customer Name</th>
            <th class="p-4">Check in & Check out</th>
            <th class="p-4">Luggage</th>
            <th class="p-4">Earnings</th>
            <th class="p-4 pr-6 text-center">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
          <tr
            v-for="booking in bookings"
            :key="booking.id"
            @click="$emit('selectBooking', booking.id)"
            class="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 group cursor-pointer transition-all"
            :class="[
              booking.id === selectedBookingId 
                ? 'bg-indigo-50/80 dark:bg-indigo-900/20 font-medium' 
                : ''
            ]"
          >
            <!-- Store Code -->
            <td class="p-4 pl-6 select-none">
              <div class="flex items-center gap-2">
                <div 
                  class="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-[10px] shadow-sm shrink-0 transition-colors"
                  :class="[
                    booking.id === selectedBookingId 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  ]"
                >
                  S
                </div>
                <div>
                  <p class="font-bold text-slate-800 dark:text-slate-200">{{ booking.storeCode }}</p>
                  <p class="text-[10px] text-slate-400 dark:text-slate-500 font-mono">ID: {{ booking.id }}</p>
                </div>
              </div>
            </td>

            <!-- Customer Name -->
            <td class="p-4 font-bold text-slate-900 dark:text-slate-100 text-sm">
              {{ booking.customerName }}
            </td>

            <!-- Check in/out Times -->
            <td class="p-4">
              <p class="text-slate-800 dark:text-slate-200 font-medium">{{ booking.checkInDate }}</p>
              <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-mono">{{ booking.timeString }}</p>
            </td>

            <!-- Bags Count -->
            <td class="p-4 font-semibold text-slate-700 dark:text-slate-300">
              {{ booking.bagsCount }} Bag{{ booking.bagsCount > 1 ? 's' : '' }}
            </td>

            <!-- Earnings -->
            <td class="p-4 font-bold text-slate-900 dark:text-slate-100 text-[13px] font-mono">
              ${{ booking.earnings.toFixed(2) }}
            </td>

            <!-- Status Badge -->
            <td class="p-4 pr-6 text-center select-none">
              <div class="flex items-center justify-center gap-2.5">
                <span class="px-2.5 py-1 rounded-full font-semibold text-[10px] inline-block shrink-0" :class="getStatusColor(booking.status)">
                  {{ booking.status }}
                </span>
                <ChevronRight 
                  class="h-3.5 w-3.5 transition-all"
                  :class="[
                    booking.id === selectedBookingId 
                      ? 'text-indigo-600 dark:text-indigo-400 translate-x-1' 
                      : 'text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100'
                  ]"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
