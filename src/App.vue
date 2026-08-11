<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import MainLayout from '@/components/Layout/MainLayout.vue'
import LoginPage from '@/views/LoginPage.vue'

// Bookings state management
const bookings = ref([])

// Auth state
const currentUser = ref(null)

// Load bookings and auth from localStorage on mount
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

  const storedUser = localStorage.getItem('booking_support_current_user')
  if (storedUser) {
    try {
      currentUser.value = JSON.parse(storedUser)
    } catch {
      currentUser.value = null
    }
  }
})

// Sync bookings to localStorage
const handleUpdateBookings = (updatedBookings) => {
  bookings.value = updatedBookings
  localStorage.setItem('booking_support_bookings', JSON.stringify(updatedBookings))
}

// Update single booking
const handleUpdateSingleBooking = (updatedBooking) => {
  const updated = bookings.value.map(b => b.id === updatedBooking.id ? updatedBooking : b)
  handleUpdateBookings(updated)
}

// Create booking
const handleCreateBooking = (newBooking) => {
  handleUpdateBookings([newBooking, ...bookings.value])
}

// Handle successful login
const handleLoginSuccess = (user) => {
  currentUser.value = user
  localStorage.setItem('booking_support_current_user', JSON.stringify(user))
}

// Handle logout
const handleLogout = () => {
  currentUser.value = null
  localStorage.removeItem('booking_support_current_user')
}
</script>

<template>
  <LoginPage v-if="!currentUser" @loginSuccess="handleLoginSuccess" />
  <MainLayout
    v-else
    :currentUser="currentUser"
    @logout="handleLogout"
  >
    <RouterView
      :bookings="bookings"
      @updateBooking="handleUpdateSingleBooking"
      @createBooking="handleCreateBooking"
    />
  </MainLayout>
</template>