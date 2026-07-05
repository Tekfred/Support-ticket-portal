<script setup>
import { X, Luggage, Mail, Phone, Calendar, MapPin } from 'lucide-vue-next'
import BookingActionButtons from './BookingActionButtons.vue'

defineOptions({ name: 'BookingDetail' })

defineProps({
  booking: { type: Object, default: null },
  isOpen: { type: Boolean, required: true }
})

defineEmits(['close', 'updateBooking', 'addBag', 'removeBag', 'cancelBooking', 'updateStatus'])
</script>

<template>
  <!-- Backdrop -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      @click="$emit('close')"
      class="fixed inset-0 bg-black/40 dark:bg-black/60 transition-colors"
      style="z-index: 40"
    />
  </Transition>

  <!-- Drawer -->
  <Transition name="slide">
    <div
      v-if="isOpen && booking"
      class="fixed right-0 top-0 bottom-0 w-full sm:w-120 bg-white dark:bg-slate-900 shadow-2xl dark:shadow-2xl border-l border-slate-200 dark:border-slate-700 overflow-y-auto transition-colors"
      style="z-index: 41"
    >
      <!-- Close Button -->
      <div class="sticky top-0 flex items-center justify-between p-6 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
        <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">Booking Details</h3>
        <button
          @click="$emit('close')"
          class="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X class="h-5 w-5 text-slate-500 dark:text-slate-400" />
        </button>
      </div>

      <div class="p-6 space-y-6">
        <!-- Booking Header Card -->
        <div class="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-2xl p-4 transition-colors">
          <div class="flex items-start justify-between gap-4 mb-3">
            <div>
              <h4 class="text-sm font-bold text-slate-900 dark:text-slate-100">{{ booking.customerName }}</h4>
              <p class="text-xs text-slate-600 dark:text-slate-400 mt-1 font-mono">Store Code: {{ booking.storeCode }}</p>
            </div>
            <span class="px-3 py-1 rounded-full font-semibold text-[10px] whitespace-nowrap"
              :class="[
                booking.status === 'Active'
                  ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                  : booking.status === 'Checked in'
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                  : booking.status === 'Upcoming'
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                  : booking.status === 'Cancelled'
                  ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              ]"
            >
              {{ booking.status }}
            </span>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="space-y-3">
          <h5 class="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">Contact</h5>
          <div class="space-y-2">
            <div class="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
              <Mail class="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
              <a :href="`mailto:${booking.email}`" class="hover:text-indigo-600 dark:hover:text-indigo-400 break-all">
                {{ booking.email }}
              </a>
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
              <Phone class="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
              <a :href="`tel:${booking.phone}`" class="hover:text-indigo-600 dark:hover:text-indigo-400">
                {{ booking.phone }}
              </a>
            </div>
          </div>
        </div>

        <!-- Dates & Times -->
        <div class="space-y-3">
          <h5 class="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">Timeline</h5>
          <div class="space-y-2">
            <div class="flex items-start gap-3 text-sm">
              <Calendar class="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
              <div>
                <p class="text-slate-700 dark:text-slate-300 font-medium">{{ booking.checkInDate }} → {{ booking.checkOutDate }}</p>
                <p class="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">{{ booking.checkInTime }} - {{ booking.checkOutTime }}</p>
              </div>
            </div>
            <div class="flex items-start gap-3 text-sm">
              <MapPin class="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
              <div>
                <p class="text-slate-700 dark:text-slate-300 font-medium">Store Location</p>
                <p class="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">{{ booking.storeCode }} - Booking Reference</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Luggage Summary -->
        <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 transition-colors">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <Luggage class="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <span class="text-sm font-bold text-slate-900 dark:text-slate-100">Total Luggage</span>
            </div>
            <span class="text-lg font-bold text-indigo-600 dark:text-indigo-400">{{ booking.bagsCount }}</span>
          </div>
          <p class="text-[12px] text-slate-600 dark:text-slate-400">
            Earning: <span class="font-bold text-slate-900 dark:text-slate-100 font-mono">${{ booking.earnings.toFixed(2) }}</span>
          </p>
        </div>

        <!-- Notes -->
        <div class="space-y-2">
          <h5 class="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">Notes</h5>
          <p class="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-200 dark:border-slate-700 min-h-15 leading-relaxed transition-colors">
            {{ booking.notes || '—' }}
          </p>
        </div>

        <!-- Action Buttons -->
        <BookingActionButtons
          :booking="booking"
          @addBag="$emit('addBag', booking.id)"
          @removeBag="$emit('removeBag', booking.id)"
          @cancelBooking="$emit('cancelBooking', booking.id)"
          @updateStatus="(status) => $emit('updateStatus', { bookingId: booking.id, status })"
        />
      </div>
    </div>
  </Transition>

  <style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity 0.3s ease;
    }
    .fade-enter-from, .fade-leave-to {
      opacity: 0;
    }

    .slide-enter-active, .slide-leave-active {
      transition: transform 0.3s ease;
    }
    .slide-enter-from {
      transform: translateX(100%);
    }
    .slide-leave-to {
      transform: translateX(100%);
    }
  </style>
</template>
