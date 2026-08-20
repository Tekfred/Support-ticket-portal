<script setup>
import { Plus, Trash2, X } from 'lucide-vue-next'

defineOptions({ name: 'BookingActionButtons' })

defineProps({
  booking: { type: Object, required: true }
})

defineEmits(['addBag', 'removeBag', 'cancelBooking', 'updateStatus'])

const statuses = ['Active', 'Checked in', 'Upcoming', 'Cancelled']
</script>

<template>
  <div class="space-y-3 p-4 surface-soft rounded-xl transition-colors">
    <!-- Status Selector -->
    <div class="space-y-2">
      <label class="text-label">Update Status</label>
      <select
        :value="booking.status"
        @change="(e) => $emit('updateStatus', e.target.value)"
        class="w-full px-3 py-2 text-sm rounded-lg control-input cursor-pointer font-medium"
      >
        <option v-for="status in statuses" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
    </div>

    <!-- Bag Management -->
    <div class="space-y-2">
      <label class="text-label">Luggage Management</label>
      <div class="flex gap-2">
        <button
          @click="$emit('addBag')"
          class="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 dark:hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition-colors text-sm active:scale-95"
        >
          <Plus class="h-4 w-4" />
          Add Bag
        </button>
        <button
          v-if="booking.bagsCount > 0"
          @click="$emit('removeBag')"
          class="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 dark:hover:bg-orange-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm active:scale-95"
        >
          <Trash2 class="h-4 w-4" />
        </button>
      </div>
      <p class="text-data-sm text-slate-500 dark:text-slate-400">Current: {{ booking.bagsCount }} bag{{ booking.bagsCount > 1 ? 's' : '' }}</p>
    </div>

    <!-- Cancel Booking -->
    <button
      @click="$emit('cancelBooking')"
      v-if="booking.status !== 'Cancelled'"
      class="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-medium py-2 rounded-lg transition-colors text-sm border border-red-200 dark:border-red-700 active:scale-95"
    >
      <X class="h-4 w-4" />
      Cancel Booking
    </button>
  </div>
</template>
