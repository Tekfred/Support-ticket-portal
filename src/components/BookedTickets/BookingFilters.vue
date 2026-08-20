<script setup>
import { Search } from 'lucide-vue-next'

defineOptions({ name: 'BookingFilters' })

defineProps({
  activeTab: { type: String, required: true },
  searchQuery: { type: String, required: true },
})

const emit = defineEmits(['update:activeTab', 'update:searchQuery', 'resetPage'])

const tabs = ['All', 'Active', 'Upcoming', 'Checked in']

const handleTabClick = (tab) => {
  emit('update:activeTab', tab)
  emit('resetPage')
}

// search handled inline in template
</script>

<template>
  <div
    class="surface-card flex flex-col md:flex-row md:items-center justify-between gap-4 p-3.5 rounded-2xl"
  >
    <!-- Status Tabs -->
    <div class="flex flex-wrap items-center gap-1.5" id="bookings-status-tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="() => handleTabClick(tab)"
        class="px-4 py-2 text-data font-semibold rounded-xl uppercase tracking-wider transition-all cursor-pointer"
        :class="[
          activeTab === tab
            ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-md'
            : 'chip-muted',
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Search Input -->
    <div class="relative w-full sm:w-60">
      <Search
        class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500"
      />
      <input
        type="text"
        placeholder="Search bookings or tags..."
        :value="searchQuery"
        @input="
          (e) => {
            $emit('update:searchQuery', e.target.value)
            $emit('resetPage')
          }
        "
        class="pl-9 pr-4 py-2 text-body font-sans w-full control-input rounded-xl"
      />
    </div>
  </div>
</template>
