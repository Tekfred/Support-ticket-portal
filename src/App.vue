<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import MainLayout from '@/components/Layout/MainLayout.vue'

// Bookings state management
const bookings = ref([])

// Load bookings from localStorage on mount
onMounted(() => {
  const stored = localStorage.getItem('booking_support_bookings')
  if (stored) {
    try {
      bookings.value = JSON.parse(stored)
    } catch (e) {
      console.error('Failed to parse stored bookings:', e)
      bookings.value = []
    }
  }
})

// Sync bookings to localStorage
const handleUpdateBookings = (updatedBookings) => {
  bookings.value = updatedBookings
  localStorage.setItem('booking_support_bookings', JSON.stringify(updatedBookings))
}

// Update single booking (triggers when adding bags, cancelling, or editing status)
const handleUpdateSingleBooking = (updatedBooking) => {
  const updated = bookings.value.map(b => b.id === updatedBooking.id ? updatedBooking : b)
  handleUpdateBookings(updated)
}

// Create booking (triggers when completing the Form)
const handleCreateBooking = (newBooking) => {
  handleUpdateBookings([newBooking, ...bookings.value])
}
</script>

<template>
  <MainLayout>
    <RouterView
      :bookings="bookings"
      @updateBooking="handleUpdateSingleBooking"
      @createBooking="handleCreateBooking"
    />
  </MainLayout>
</template>
