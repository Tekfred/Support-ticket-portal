<script setup>
import { ref, computed } from 'vue';
import { Plus, X, Sparkles } from 'lucide-vue-next';

import SortControls from '@/components/UnassignedTickets/SortControls.vue'
import TicketsBoard from '@/components/UnassignedTickets/TicketsBoard.vue'
import NewTickets from '@/components/UnassignedTickets/NewTickets.vue'
import Modal from '@/components/Shared/Modal.vue'

import { storeToRefs } from 'pinia'
import { useTicketStore } from '@/stores/ticketStore'

const ticketStore = useTicketStore()
const { tickets } = storeToRefs(ticketStore)

const emit = defineEmits(['createTicket']);

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
const newTicketComp = ref('');
const newTicketCat = ref('');
const newTicketPos = ref('');
const newTicketType = ref('FULLTIME');
const newTicketStatus = ref('Pending');
const newTicketDept = ref('Support Operations');
const newTicketPriority = ref('medium');
const newTicketEmail = ref('');
const newTicketPhone = ref('');
const newTicketDesc = ref('');

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


const handleCreateSubmit = () => {
  if (!newTicketComp.value || !newTicketPos.value || !newTicketDesc.value) {
    alert('Please fill out the Company, Position, and Description fields.');
    return;
  }

  createTicketHandler({
    company: newTicketComp.value,
    category: newTicketCat.value || 'Support Operations',
    position: newTicketPos.value,
    type: newTicketType.value,
    status: newTicketStatus.value,
    department: newTicketDept.value,
    priority: newTicketPriority.value,
    email: newTicketEmail.value || 'customer@example.com',
    phone: newTicketPhone.value || '+1 (555) 012-3456',
    description: newTicketDesc.value,
  });

  // Reset form field states
  newTicketComp.value = '';
  newTicketCat.value = '';
  newTicketPos.value = '';
  newTicketDesc.value = '';
  newTicketEmail.value = '';
  newTicketPhone.value = '';
  isCreateOpen.value = false;
};


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
      <form @submit.prevent="handleCreateSubmit" class="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
        <!-- form content (same as before) -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Company Name *</label>
            <input type="text" required placeholder="e.g. Mosciski Inc." v-model="newTicketComp" class="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
            <input type="text" placeholder="e.g. Creative Design Agency" v-model="newTicketCat" class="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Target Title *</label>
            <input type="text" required placeholder="e.g. Intern UI Designer" v-model="newTicketPos" class="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Department</label>
            <input type="text" v-model="newTicketDept" class="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans" />
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Contract Type</label>
            <select v-model="newTicketType" class="w-full text-xs p-2.5 rounded-lg border border-slate-200 font-medium cursor-pointer"><option value="FREELANCE">Freelance</option><option value="PART TIME">Part Time</option><option value="FULLTIME">Fulltime</option></select>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Status</label>
            <select v-model="newTicketStatus" class="w-full text-xs p-2.5 rounded-lg border border-slate-200 font-medium cursor-pointer"><option value="Pending">Pending</option><option value="On-Hold">On-Hold</option><option value="Candidate">Candidate</option></select>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Priority</label>
            <select v-model="newTicketPriority" class="w-full text-xs p-2.5 rounded-lg border border-slate-200 font-medium cursor-pointer"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option></select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email address</label>
            <input type="email" placeholder="customer@net.com" v-model="newTicketEmail" class="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone line</label>
            <input type="text" placeholder="+1 (555) 000-0000" v-model="newTicketPhone" class="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans" />
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Support Issue Details *</label>
          <textarea rows="3" placeholder="Provide a functional overview of the customer’s request, luggage challenges, or transport issues..." v-model="newTicketDesc" class="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans resize-none" required />
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3"><button type="button" @click="isCreateOpen = false" class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer">Discard</button><button type="submit" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/10 cursor-pointer">Release Ticket</button></div>
      </form>
    </Modal>
  </div>
</template>

