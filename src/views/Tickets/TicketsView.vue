<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import NewTIckets from './components/NewTIckets.vue'
import TicketsGrid from './components/TicketsGrid.vue'
import TicketsList from './components/TicketsList.vue'
import TicketsMobileList from './components/TicketsMobileList.vue'
import TicketsPagination from './components/TicketsPagination.vue'
import TicketsToolbar from './components/TicketsToolbar.vue'
import { ticketApplications, ticketFilters } from './data/ticketApplications'
import { statusClass } from './utils/statusClass'

const allApplications = ref(ticketApplications)
const activeFilter = ref('All')
const viewMode = ref('list')
const viewportWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1280)

const currentPage = ref(3)
const selectedSort = ref('Newest')
const perPage = 10
const totalData = 160
const totalPages = Math.ceil(totalData / perPage)

const visiblePages = computed(() => {
  const pages = []
  for (let i = 1; i <= totalPages; i++) pages.push(i)
  const start = Math.max(1, currentPage.value - 1)
  const end = Math.min(totalPages, start + 3)
  return pages.slice(start - 1, end)
})

const gridColumnsClass = computed(() => {
  if (viewportWidth.value >= 1280) return 'xl:grid-cols-3 grid-cols-2'
  if (viewportWidth.value >= 520) return 'grid-cols-2'
  return 'grid-cols-1'
})

function updateViewportWidth() {
  viewportWidth.value = window.innerWidth
}

onMounted(() => {
  updateViewportWidth()
  window.addEventListener('resize', updateViewportWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewportWidth)
})

function setPage(page) {
  if (page >= 1 && page <= totalPages) currentPage.value = page
}
</script>

<template>
  <TicketsToolbar
    v-model:active-filter="activeFilter"
    v-model:selected-sort="selectedSort"
    v-model:view-mode="viewMode"
    :filters="ticketFilters"
  />
  <NewTIckets />

  <div class="px-4 pb-6 font-sans transition-colors">
    <div
      class="overflow-hidden rounded-2xl"
      :class="
        viewMode === 'list'
          ? 'bg-white shadow-[0_2px_12px_rgba(15,23,42,0.08)]'
          : 'bg-transparent shadow-none'
      "
    >
      <TicketsList
        v-if="viewMode === 'list'"
        :applications="allApplications"
        :status-class="statusClass"
      />

      <TicketsGrid
        v-if="viewMode === 'grid'"
        :applications="allApplications"
        :grid-columns-class="gridColumnsClass"
        :status-class="statusClass"
      />

      <TicketsMobileList v-else :applications="allApplications" :status-class="statusClass" />
    </div>

    <TicketsPagination
      :current-page="currentPage"
      :total-pages="totalPages"
      :visible-pages="visiblePages"
      @set-page="setPage"
    />
  </div>
</template>
