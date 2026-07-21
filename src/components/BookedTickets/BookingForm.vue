<script setup>
import { X } from 'lucide-vue-next'
import { ref } from 'vue'

defineOptions({ name: 'BookingForm' })

defineProps({
  isOpen: { type: Boolean, required: true }
})

const emit = defineEmits(['close', 'submit'])

const formData = ref({
  customerName: '',
  storeCode: '',
  email: '',
  phone: '',
  checkInDate: '',
  checkOutDate: '',
  checkInTime: '08:00',
  checkOutTime: '18:00',
  bagsCount: 1,
  notes: ''
})

const resetForm = () => {
  formData.value = {
    customerName: '',
    storeCode: '',
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    checkInTime: '08:00',
    checkOutTime: '18:00',
    bagsCount: 1,
    notes: ''
  }
}

const handleSubmit = () => {
  if (!formData.value.customerName || !formData.value.storeCode || !formData.value.email || !formData.value.phone) {
    alert('Please fill in all required fields')
    return
  }

  const newBooking = {
    id: Date.now().toString(),
    ...formData.value,
    bagsCount: parseInt(formData.value.bagsCount),
    earnings: parseInt(formData.value.bagsCount) * 5,
    status: 'Active',
    checkInTime: formData.value.checkInTime,
    checkOutTime: formData.value.checkOutTime,
    checkInDate: formData.value.checkInDate,
    checkOutDate: formData.value.checkOutDate,
    timeString: `${formData.value.checkInTime} - ${formData.value.checkOutTime}`
  }

  emit('submit', newBooking)
  resetForm()
  emit('close')
}

const handleClose = () => {
  resetForm()
  emit('close')
}
</script>

<template>
  <!-- Backdrop -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      @click="handleClose"
      class="fixed inset-0 bg-black/40 dark:bg-black/60 transition-colors"
      style="z-index: 50"
    />
  </Transition>

  <!-- Modal -->
  <Transition name="scale">
    <div
      v-if="isOpen"
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl surface-panel rounded-2xl shadow-2xl dark:shadow-black/50 max-h-[90vh] overflow-y-auto transition-colors"
      style="z-index: 51"
    >
      <!-- Modal Header -->
      <div class="sticky top-0 flex items-center justify-between p-6 bg-slate-50/90 dark:bg-slate-950/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100">Create New Booking</h3>
        <button
          @click="handleClose"
          class="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X class="h-5 w-5 text-slate-500 dark:text-slate-400" />
        </button>
      </div>

      <!-- Form Content -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Customer Info -->
        <div class="space-y-4">
          <h4 class="text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">Customer Information</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Customer Name *</label>
              <input
                v-model="formData.customerName"
                type="text"
                placeholder="John Doe"
                class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 dark:placeholder-slate-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Store Code *</label>
              <input
                v-model="formData.storeCode"
                type="text"
                placeholder="STR-001"
                class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 dark:placeholder-slate-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="space-y-4">
          <h4 class="text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">Contact Details</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Email *</label>
              <input
                v-model="formData.email"
                type="email"
                placeholder="john@example.com"
                class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 dark:placeholder-slate-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Phone *</label>
              <input
                v-model="formData.phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 dark:placeholder-slate-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <!-- Dates & Times -->
        <div class="space-y-4">
          <h4 class="text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">Booking Timeline</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Check-in Date *</label>
              <input
                v-model="formData.checkInDate"
                type="date"
                class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Check-out Date *</label>
              <input
                v-model="formData.checkOutDate"
                type="date"
                class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Check-in Time</label>
              <input
                v-model="formData.checkInTime"
                type="time"
                class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Check-out Time</label>
              <input
                v-model="formData.checkOutTime"
                type="time"
                class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <!-- Luggage & Notes -->
        <div class="space-y-4">
          <h4 class="text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">Details</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Number of Bags</label>
              <input
                v-model="formData.bagsCount"
                type="number"
                min="1"
                class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <label class="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Notes</label>
            <textarea
              v-model="formData.notes"
              placeholder="Any special instructions or notes..."
              rows="3"
              class="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 dark:placeholder-slate-500 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <button
            type="button"
            @click="handleClose"
            class="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-semibold rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 dark:hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors active:scale-95"
          >
            Create Booking
          </button>
        </div>
      </form>
    </div>
  </Transition>

</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.scale-enter-active, .scale-leave-active {
  transition: all 0.3s ease;
}
.scale-enter-from, .scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
