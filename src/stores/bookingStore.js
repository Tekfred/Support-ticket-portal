import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loadBookings, saveBookings, INITIAL_BOOKINGS } from '@/stores/Data'

export const useBookingStore = defineStore('bookings', () => {
  const bookings = ref(loadBookings() || INITIAL_BOOKINGS)

  const persist = () => {
    try {
      saveBookings(bookings.value)
    } catch (e) {
      console.error('Failed to save bookings', e)
    }
  }

  return { bookings, persist }
})
