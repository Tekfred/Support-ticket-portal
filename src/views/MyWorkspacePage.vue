<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTicketStore } from '@/stores/ticketStore'

// import WorkspaceHeader from '@/components/MyTickets/Workspaceheader.vue'
import TicketGrid from '@/components/MyTickets/Ticketsgrid.vue'
// import TicketDetailView from '@/components/MyTickets/Ticketdetailview.vue'

// ── Store ──────────────────────────────────────────────────────────────
const ticketStore = useTicketStore()
const { tickets } = storeToRefs(ticketStore)

const CURRENT_USER_EMAIL = 'ansahaudi86@gmail.com'

// ── Derived state ──────────────────────────────────────────────────────
const myTickets = computed(() =>
  tickets.value.filter(t => t.acceptedBy === CURRENT_USER_EMAIL)
)

// ── Navigation state ───────────────────────────────────────────────────
const selectedTicketId = ref(null)

const selectedTicket = computed(() =>
  tickets.value.find(t => t.id === selectedTicketId.value) ?? null
)

// ── Handlers ───────────────────────────────────────────────────────────
function handleSelectTicket(id) {
  selectedTicketId.value = id
}

function handleBack() {
  selectedTicketId.value = null
}

function handleUpdateTicket(updatedTicket) {
  ticketStore.updateTicket(updatedTicket)
}

function handleReleaseTicket(id) {
  ticketStore.releaseTicket(id)
  selectedTicketId.value = null
}
</script>

<template>
  <div class="flex-1 min-h-screen bg-slate-50 p-6 md:p-8 overflow-y-auto font-sans">
    <Transition name="fade-slide" mode="out-in">

      <!-- LIST VIEW -->
      <div v-if="!selectedTicket" class="space-y-6" id="my-workspace-list">
        <WorkspaceHeader :tickets="myTickets" />
        <TicketGrid
          :tickets="myTickets"
          @selectTicket="handleSelectTicket"
        />
      </div>

      <!-- DETAIL VIEW -->
      <TicketDetailView
        v-else
        :ticket="selectedTicket"
        @back="handleBack"
        @updateTicket="handleUpdateTicket"
        @releaseTicket="handleReleaseTicket"
      />

    </Transition>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease-out;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
