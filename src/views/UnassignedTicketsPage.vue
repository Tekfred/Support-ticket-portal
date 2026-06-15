<script setup>
import { ref, computed } from 'vue';
import {
  Search,
  LayoutGrid,
  List,
  Plus,
  Phone,
  Mail,
  MoreVertical,
  X,
  AlertCircle,
  Clock,
  UserPlus,
  Trash2,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-vue-next';

import SortControls from '@/components/UnassignedTickets/SortControls.vue'
import TicketsBoard from '@/components/UnassignedTickets/TicketsBoard.vue'
import NewTickets from '@/components/UnassignedTickets/NewTickets.vue'

const props = defineProps({
  tickets: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['acceptTicket', 'createTicket']);

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

// Dropdown states for cards
const activeActionsId = ref(null);

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 6;

// Filter unassigned tickets
const unassignedTickets = computed(() => props.tickets.filter(t => !t.acceptedBy));

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
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const paginatedTickets = computed(() => sortedTickets.value.slice(startIndex.value, startIndex.value + itemsPerPage));

const getStatusStyle = (status) => {
  switch (status) {
    case 'Pending':
      return 'bg-violet-50 text-violet-600 border border-violet-200';
    case 'On-Hold':
      return 'bg-amber-50 text-amber-600 border border-amber-200';
    case 'Candidate':
      return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
    case 'Resolved':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    default:
      return 'bg-slate-50 text-slate-600 border border-slate-200';
  }
};

const getPriorityStyle = (p) => {
  switch (p) {
    case 'critical':
      return 'bg-red-500 text-white font-semibold';
    case 'high':
      return 'bg-rose-100 text-rose-700';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-slate-100 text-slate-700';
  }
};

const getAvatarInitials = (comp) => {
  if (!comp) return '?';
  return comp.split(' ')[0][0].toUpperCase();
};

const getAvatarBackground = (comp) => {
  const char = getAvatarInitials(comp);
  const code = char.charCodeAt(0) || 0;
  if (code % 3 === 0) return 'bg-orange-500 text-white';
  if (code % 3 === 1) return 'bg-slate-700 text-white';
  return 'bg-indigo-600 text-white';
};

const handleCreateSubmit = () => {
  if (!newTicketComp.value || !newTicketPos.value || !newTicketDesc.value) {
    alert('Please fill out the Company, Position, and Description fields.');
    return;
  }

  emit('createTicket', {
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

const toggleActions = (id) => {
  activeActionsId.value = activeActionsId.value === id ? null : id;
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
    <NewTickets :tickets="props.tickets" :activeFilter="activeFilter" :searchQuery="searchQuery" :sortBy="sortBy" />


    <TicketsBoard
      :tickets="sortedTickets"
      :viewMode="viewMode"
      :currentPage="currentPage"
      :itemsPerPage="itemsPerPage"
      :totalPages="totalPages"
      @acceptTicket="id => emit('acceptTicket', id)"
      @update:currentPage="val => currentPage = val"
    />


        <table class="w-full text-left border-collapse font-sans">
          <thead>
            <tr class="bg-slate-50/50 border-b border-slate-200 text-slate-400 font-mono text-[10px] tracking-widest uppercase font-semibold">
              <th class="p-4 pl-6">Company</th>
              <th class="p-4">Ticket ID</th>
              <th class="p-4">Desired Position</th>
              <th class="p-4">Type</th>
              <th class="p-4">Priority</th>
              <th class="p-4">Status</th>
              <th class="p-4">Applied Date</th>
              <th class="p-4 pr-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-sm">
            <tr v-for="ticket in paginatedTickets" :key="ticket.id" class="hover:bg-slate-50/70 transition-colors group">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-3">
                  <div class="h-8 w-8 rounded-lg font-bold flex items-center justify-center text-xs shadow-sm" :class="getAvatarBackground(ticket.company)">
                    {{ getAvatarInitials(ticket.company) }}
                  </div>
                  <div>
                    <p class="font-bold text-slate-900 font-display">{{ ticket.company }}</p>
                    <p class="text-[10px] text-slate-400 mt-0.5">{{ ticket.category }}</p>
                  </div>
                </div>
              </td>
              <td class="p-4 font-mono font-semibold text-indigo-600 text-xs">#{{ ticket.id }}</td>
              <td class="p-4 text-slate-700 font-medium">{{ ticket.position }}</td>
              <td class="p-4">
                <span class="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded">
                  {{ ticket.type }}
                </span>
              </td>
              <td class="p-4">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider" :class="getPriorityStyle(ticket.priority)">
                  {{ ticket.priority }}
                </span>
              </td>
              <td class="p-4">
                <span class="px-2 py-0.5 rounded-full text-xs font-semibold" :class="getStatusStyle(ticket.status)">
                  {{ ticket.status }}
                </span>
              </td>
              <td class="p-4 font-mono text-xs text-slate-500">{{ ticket.appliedDate }}</td>
              <td class="p-4 pr-6 text-center">
                <button
                  @click="emit('acceptTicket', ticket.id)"
                  class="opacity-100 md:opacity-0 group-hover:opacity-100 bg-indigo-50 hover:bg-indigo-650 text-indigo-600 hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                >
                  <UserPlus class="h-3.5 w-3.5" />
                  Accept
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination Control -->
    <div class="mt-8 flex items-center justify-between border-t border-slate-200/80 pt-6 font-sans">
      <button
        @click="currentPage = Math.max(currentPage - 1, 1)"
        :disabled="currentPage === 1"
        class="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 hover:bg-white text-slate-600 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
      >
        <ChevronLeft class="h-4 w-4" />
        Previous
      </button>

      <!-- Page selector pills -->
      <div class="flex items-center gap-1.5 flex-wrap">
        <button
          v-for="(_, i) in totalPages"
          :key="i"
          @click="currentPage = i + 1"
          class="h-9 w-9 text-xs font-semibold rounded-lg flex items-center justify-center transition-all cursor-pointer"
          :class="[
            i + 1 === currentPage
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
              : 'hover:bg-white text-slate-600 border border-transparent hover:border-slate-200'
          ]"
        >
          {{ i + 1 }}
        </button>
      </div>

      <button
        @click="currentPage = Math.min(currentPage + 1, totalPages)"
        :disabled="currentPage === totalPages"
        class="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 hover:bg-white text-slate-600 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
      >
        Next
        <ChevronRight class="h-4 w-4" />
      </button>
    </div>

    <!-- Create Ticket Dialog Modal Overlay -->
    <Transition name="modal">
      <div v-if="isCreateOpen" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-none" id="modal-container-create-ticket">
        <!-- Click-outside listener -->
        <div class="absolute inset-0" @click="isCreateOpen = false" />

        <!-- Modal Dialog Content -->
        <div class="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative z-10 border border-slate-200 overflow-hidden text-left">
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
            <div class="grid grid-cols-2 gap-4">
              <!-- Company/Client Name -->
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mosciski Inc."
                  v-model="newTicketComp"
                  class="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>

              <!-- Category -->
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Creative Design Agency"
                  v-model="newTicketCat"
                  class="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <!-- Position -->
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Target Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Intern UI Designer"
                  v-model="newTicketPos"
                  class="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>

              <!-- Department -->
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Department</label>
                <input
                  type="text"
                  v-model="newTicketDept"
                  class="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <!-- Ticket Type -->
              <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Contract Type</label>
                <select
                  v-model="newTicketType"
                  class="w-full text-xs p-2.5 rounded-lg border border-slate-200 font-medium cursor-pointer"
                >
                  <option value="FREELANCE">Freelance</option>
                  <option value="PART TIME">Part Time</option>
                  <option value="FULLTIME">Fulltime</option>
                </select>
              </div>

              <!-- Initial Status -->
              <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Status</label>
                <select
                  v-model="newTicketStatus"
                  class="w-full text-xs p-2.5 rounded-lg border border-slate-200 font-medium cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="On-Hold">On-Hold</option>
                  <option value="Candidate">Candidate</option>
                </select>
              </div>

              <!-- Priority -->
              <div>
                <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Priority</label>
                <select
                  v-model="newTicketPriority"
                  class="w-full text-xs p-2.5 rounded-lg border border-slate-200 font-medium cursor-pointer"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <!-- Email -->
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email address</label>
                <input
                  type="email"
                  placeholder="customer@net.com"
                  v-model="newTicketEmail"
                  class="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Phone line</label>
                <input
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  v-model="newTicketPhone"
                  class="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Support Issue Details *</label>
              <textarea
                rows="3"
                placeholder="Provide a functional overview of the customer’s request, luggage challenges, or transport issues..."
                v-model="newTicketDesc"
                class="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans resize-none"
                required
              />
            </div>

            <!-- Submit Panel -->
            <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                @click="isCreateOpen = false"
                class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
              >
                Discard
              </button>
              <button
                type="submit"
                class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
              >
                Release Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.95) translateY(15px);
  opacity: 0;
}
</style>
