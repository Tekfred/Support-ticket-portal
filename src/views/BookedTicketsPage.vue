<script setup>
import { ref, computed } from 'vue'
import BookingsHeader from '@/components/BookedTickets/BookingsHeader.vue'
import BookingFilters from '@/components/BookedTickets/BookingFilters.vue'
import BookingsTable from '@/components/BookedTickets/BookingsTable.vue'
import BookingDetail from '@/components/BookedTickets/BookingDetail.vue'
import BookingForm from '@/components/BookedTickets/BookingForm.vue'

defineOptions({ name: 'BookedTicketsPage' })

// Props from App.vue
const props = defineProps({
  bookings: { type: Array, default: () => [] }
})

// Emits to App.vue
const emit = defineEmits(['updateBooking', 'createBooking'])

// Local page state
const activeTab = ref('All')
const searchQuery = ref('')
const selectedBookingId = ref(null)
const isFormOpen = ref(false)

// Filter bookings based on activeTab
const filteredByTab = computed(() => {
  if (activeTab.value === 'All') return props.bookings
  return props.bookings.filter(b => b.status === activeTab.value)
})

// Search & filter bookings
const filteredBookings = computed(() => {
  return filteredByTab.value.filter(booking => {
    const query = searchQuery.value.toLowerCase()
    return (
      booking.customerName.toLowerCase().includes(query) ||
      booking.storeCode.toLowerCase().includes(query) ||
      booking.email.toLowerCase().includes(query) ||
      booking.id.toLowerCase().includes(query)
    )
  })
})

// Get selected booking details
const selectedBooking = computed(() => {
  return filteredBookings.value.find(b => b.id === selectedBookingId.value)
})

// Handlers
const handleAddBag = (bookingId) => {
  const booking = props.bookings.find(b => b.id === bookingId)
  if (booking) {
    const updatedBooking = {
      ...booking,
      bagsCount: booking.bagsCount + 1,
      earnings: (booking.bagsCount + 1) * 5
    }
    emit('updateBooking', updatedBooking)
  }
}

const handleRemoveBag = (bookingId) => {
  const booking = props.bookings.find(b => b.id === bookingId)
  if (booking && booking.bagsCount > 0) {
    const updatedBooking = {
      ...booking,
      bagsCount: booking.bagsCount - 1,
      earnings: (booking.bagsCount - 1) * 5
    }
    emit('updateBooking', updatedBooking)
  }
}

const handleCancelBooking = (bookingId) => {
  const booking = props.bookings.find(b => b.id === bookingId)
  if (booking) {
    const updatedBooking = {
      ...booking,
      status: 'Cancelled'
    }
    emit('updateBooking', updatedBooking)
    selectedBookingId.value = null
  }
}

const handleUpdateStatus = ({ bookingId, status }) => {
  const booking = props.bookings.find(b => b.id === bookingId)
  if (booking) {
    const updatedBooking = { ...booking, status }
    emit('updateBooking', updatedBooking)
  }
}

const handleCreateBooking = (newBooking) => {
  emit('createBooking', newBooking)
  isFormOpen.value = false
}
</script>

<template>
  <div class="flex-1 min-h-screen overflow-y-auto font-sans">
    <!-- Page Header -->
    <BookingsHeader
      :bookingsCount="props.bookings.length"
      @openAddModal="isFormOpen = true"
    />

    <div class="mt-8 space-y-6">
      <!-- Filters & Search -->
      <BookingFilters
        :activeTab="activeTab"
        :searchQuery="searchQuery"
        @update:activeTab="activeTab = $event"
        @update:searchQuery="searchQuery = $event"
        @resetPage="selectedBookingId = null"
      />

      <!-- Main Content Area -->
      <div class="flex gap-6 h-[calc(100vh-300px)] min-h-87.5">
        <!-- Left: Bookings Table -->
        <div class="flex-1 flex flex-col">
          <BookingsTable
            :bookings="filteredBookings"
            :selectedBookingId="selectedBookingId"
            @selectBooking="selectedBookingId = $event"
          />
        </div>

        <!-- Right: Booking Detail Drawer -->
        <BookingDetail
          :booking="selectedBooking"
          :isOpen="selectedBookingId !== null"
          @close="selectedBookingId = null"
          @addBag="handleAddBag"
          @removeBag="handleRemoveBag"
          @cancelBooking="handleCancelBooking"
          @updateStatus="handleUpdateStatus"
        />
      </div>
    </div>

    <!-- Create Booking Modal -->
    <BookingForm
      :isOpen="isFormOpen"
      @close="isFormOpen = false"
      @submit="handleCreateBooking"
    />
  </div>
</template>
