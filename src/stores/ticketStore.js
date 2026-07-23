import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loadTickets, saveTickets, INITIAL_TICKETS } from '@/stores/Data'

export const useTicketStore = defineStore('tickets', () => {
  const tickets = ref(loadTickets() || INITIAL_TICKETS)

  const persist = () => {
    try {
      saveTickets(tickets.value)
    } catch (e) {
      console.error('Failed to save tickets', e)
    }
  }

  function acceptTicket(id, acceptedBy = 'ansahaudi86@gmail.com') {
    const t = tickets.value.find(x => x.id === id)
    if (!t) return false
    t.acceptedBy = acceptedBy
    persist()
    return true
  }

  function createTicket(payload) {
    // create a simple incremental ID based on length + timestamp
    const id = `APL-${String(Date.now()).slice(-6)}`
    const ticket = {
      id,
      company: payload.company,
      category: payload.category || 'Support Operations',
      position: payload.position,
      type: payload.type || 'FULLTIME',
      status: payload.status || 'Pending',
      appliedDate: new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      email: payload.email,
      phone: payload.phone,
      priority: payload.priority || 'medium',
      department: payload.department || 'Support Operations',
      description: payload.description || '',
      acceptedBy: null,
      comments: []
    }
    tickets.value.unshift(ticket)
    persist()
    return ticket
  }

  function updateTicket(updatedTicket) {
    const index = tickets.value.findIndex(t => t.id === updatedTicket.id)
    if (index === -1) return
    tickets.value[index] = updatedTicket
    persist()
  }

  function releaseTicket(id) {
    const t = tickets.value.find(x => x.id === id)
    if (!t) return
    t.acceptedBy = null
    persist()
  }

  function reload() {
    tickets.value = loadTickets() || INITIAL_TICKETS
  }

  return { tickets, acceptTicket, createTicket, updateTicket, releaseTicket, persist, reload }
})
