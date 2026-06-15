<script setup>
import { ref, computed } from 'vue';
import { Plus, X, Sparkles } from 'lucide-vue-next';

import SortControls from '@/components/UnassignedTickets/SortControls.vue'
import TicketsBoard from '@/components/UnassignedTickets/TicketsBoard.vue'
import NewTickets from '@/components/UnassignedTickets/NewTickets.vue'
import NewTicketForm from '@/components/UnassignedTickets/NewTicketForm.vue'
import Modal from '@/components/Shared/Modal.vue'

import { storeToRefs } from 'pinia'
import { useTicketStore } from '@/stores/ticketStore'

const ticketStore = useTicketStore()
const { tickets } = storeToRefs(ticketStore)


// handler functions
const acceptTicketHandler = (id) => {
  ticketStore.acceptTicket(id)
}
const createTicketHandler = (payload) => {
  ticketStore.createTicket(payload)
}


// Local page state
const activeFilter = ref('All');
const viewMode = ref('grid');
const searchQuery = ref('');
const sortBy = ref('newest');

// Create ticket state
const isCreateOpen = ref(false);

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 6;

// Filter unassigned tickets
const unassignedTickets = computed(() => tickets.value.filter(t => !t.acceptedBy));

// Apply filters
const filteredTickets = computed(() => {
  return unassignedTickets.value.filter(ticket => {
    const matchesStatus = activeFilter.value === 'All' ? true : ticket.status === activeFilter.value;
    const matchesSearch =
      ticket.company.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.position.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesStatus && matchesSearch;
  });
});

// Apply sorting
const sortedTickets = computed(() => {
  return [...filteredTickets.value].sort((a, b) => {
    if (sortBy.value === 'newest') {
      return b.id.localeCompare(a.id); // higher IDs are newer for this schema
    } else if (sortBy.value === 'oldest') {
      return a.id.localeCompare(b.id);
    } else if (sortBy.value === 'company') {
      return a.company.localeCompare(b.company);
    } else if (sortBy.value === 'priority') {
      const priorityWeights = { critical: 4, high: 3, medium: 2, low: 1 };
      return (priorityWeights[b.priority] || 0) - (priorityWeights[a.priority] || 0);
    }
    return 0;
  });
});

// Paginated tickets
const totalPages = computed(() => Math.ceil(sortedTickets.value.length / itemsPerPage) || 1);




</script>

<template>
  <div class="flex-1 min-h-screen overflow-y-auto bg-slate-50 p-6 md:p-8 font-sans">
    <!-- Top Header Section -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8" id="unassigned-header-section">
      <div>
        <h1 class="text-3xl font-display font-bold text-slate-900 tracking-tight flex items-center gap-2">
          Unassigned Tickets
          <span class="text-sm bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-mono font-medium ml-2">
            {{ unassignedTickets.length }} open
          </span>
        </h1>
        <p class="text-slate-500 mt-1 font-display">
          Real-time incoming support requests. Prioritize and assign to take immediate action on passenger bookings.
        </p>
      </div>

      <!-- Top Control Buttons -->
      <div class="flex items-center gap-3">
        <!-- Create Button -->
        <button
          @click="isCreateOpen = true"
          id="create-new-ticket-button"
          class="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-slate-950/10 active:scale-95 text-sm cursor-pointer"
        >
          <Plus class="h-4 w-4" />
          New Ticket
        </button>
      </div>
    </div>

    <!-- Toolbar / Filters Area -->
    <SortControls
      :activeFilter="activeFilter"
      :searchQuery="searchQuery"
      :sortBy="sortBy"
      :viewMode="viewMode"
      @update:activeFilter="val => { activeFilter = val }"
      @update:searchQuery="val => { searchQuery = val }"
      @update:sortBy="val => { sortBy = val }"
      @update:viewMode="val => { viewMode = val }"
      @resetPage="currentPage = 1"
    />

    <!-- New Tickets summary -->
    <NewTickets :tickets="tickets.value" :activeFilter="activeFilter" :searchQuery="searchQuery" :sortBy="sortBy" />


    <TicketsBoard
      :tickets="sortedTickets.value"
      :viewMode="viewMode"
      :currentPage="currentPage"
      :itemsPerPage="itemsPerPage"
      :totalPages="totalPages"
      @acceptTicket="id => acceptTicketHandler(id)"
      @update:currentPage="val => currentPage = val"
    />

    <Modal :show="isCreateOpen" @update:show="isCreateOpen = $event">
      <!-- Header -->
      <div class="bg-slate-900 text-white p-5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Sparkles class="h-5 w-5 text-indigo-400" />
          <h2 class="text-lg font-display font-bold">Launch Customer Ticket</h2>
        </div>
        <button
          @click="isCreateOpen = false"
          class="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- Form Body -->
      <NewTicketForm @create="createTicketHandler" @close="isCreateOpen = false" />
    </Modal>
  </div>
</template>

