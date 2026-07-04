<script setup>
import { Search } from 'lucide-vue-next'

defineOptions({ name: 'BookingFilters' })

defineProps({
  activeTab: { type: String, required: true },
  searchQuery: { type: String, required: true }
})

defineEmits(['update:activeTab', 'update:searchQuery', 'resetPage'])

const tabs = ['All', 'Active', 'Upcoming', 'Checked in']

const handleTabClick = (tab) => {
  this.$emit('update:activeTab', tab)
  this.$emit('resetPage')
}

const handleSearch = (e) => {
  this.$emit('update:searchQuery', e.target.value)
  this.$emit('resetPage')
}
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
    <!-- Status Tabs -->
    <div class="flex flex-wrap items-center gap-1.5" id="bookings-status-tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="() => { $emit('update:activeTab', tab); $emit('resetPage'); }"
        class="px-4 py-2 text-xs font-semibold rounded-xl uppercase tracking-wider transition-all cursor-pointer"
        :class="[
          activeTab === tab
            ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-md'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Search Input -->
    <div class="relative w-full sm:w-60">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
      <input
        type="text"
        placeholder="Search bookings or tags..."
        :value="searchQuery"
        @input="(e) => { $emit('update:searchQuery', e.target.value); $emit('resetPage'); }"
        class="pl-9 pr-4 py-2 font-sans text-xs w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-100 dark:placeholder-slate-500 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
      />
    </div>
  </div>
</template>
