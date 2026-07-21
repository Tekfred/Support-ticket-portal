<script setup>
import { Plus } from 'lucide-vue-next'

defineOptions({ name: 'BookingsHeader' })

defineProps({
  bookingsCount: { type: Number, required: true }
})

defineEmits(['openAddModal'])
</script>

<template>
  <div class="surface-card rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-display font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
        Bookings Workspace
        <span class="text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 px-2.5 py-1 rounded-full font-mono font-medium ml-2">
          {{ bookingsCount }} active
        </span>
      </h1>
      <p class="text-slate-500 dark:text-slate-400 mt-1 font-display">
        Store luggage manifests. Direct bag modifications, check-ins, and cancellations from this terminal.
      </p>
    </div>

    <!-- Add New Booking Button -->
    <button
      @click="$emit('openAddModal')"
      id="add-new-booking-button"
      class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium px-5 py-3 rounded-xl transition-all shadow-md dark:shadow-indigo-950/20 active:scale-95 text-xs self-start cursor-pointer font-sans"
    >
      <Plus class="h-4 w-4" />
      Add new booking
    </button>
  </div>
</template>
