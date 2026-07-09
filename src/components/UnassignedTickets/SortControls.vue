<script setup>
import { Search, LayoutGrid, List, SlidersHorizontal } from 'lucide-vue-next'

const { activeFilter, searchQuery, sortBy, viewMode } = defineProps({
  activeFilter: { type: String, required: true },
  searchQuery: { type: String, required: true },
  sortBy: { type: String, required: true },
  viewMode: { type: String, required: true },
})

const emit = defineEmits(['update:activeFilter','update:searchQuery','update:sortBy','update:viewMode','resetPage'])

function setFilter(f){ emit('update:activeFilter', f); emit('resetPage') }
function onSearch(e){ emit('update:searchQuery', e.target.value); emit('resetPage') }
function onSort(v){ emit('update:sortBy', v) }
function onView(v){ emit('update:viewMode', v) }
</script>

<template>
  <div class="surface-card rounded-2xl p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4" id="filters-toolbar">
    <div class="flex flex-wrap items-center gap-1.5" id="status-chips-container">
      <button
        v-for="filter in ['All','Pending','On-Hold','Candidate']"
        :key="filter"
        @click="setFilter(filter)"
        class="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
        :class="[
          activeFilter === filter
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
            : 'chip-muted'
        ]"
      >
        {{ filter }}
      </button>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <div class="relative w-full sm:w-64">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder="Search details..."
          :value="searchQuery"
          @input="onSearch"
          class="w-full pl-9 pr-4 py-2 text-sm rounded-xl control-input font-sans"
        />
      </div>

      <div class="flex items-center gap-1.5">
        <SlidersHorizontal class="h-4 w-4 text-slate-400 dark:text-slate-500" />
        <select :value="sortBy" @change="e => onSort(e.target.value)" class="text-xs control-input rounded-xl px-3 py-2 font-medium">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="priority">Priority</option>
          <option value="company">Client name</option>
        </select>
      </div>

      <div class="flex items-center rounded-xl surface-soft p-1">
        <button @click="onView('grid')" class="p-1.5 rounded-lg transition-all cursor-pointer" :class="[viewMode === 'grid' ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-800 dark:text-slate-100 ring-1 ring-slate-200 dark:ring-slate-700' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300']" title="Grid Layout">
          <LayoutGrid class="h-4 w-4" />
        </button>
        <button @click="onView('list')" class="p-1.5 rounded-lg transition-all cursor-pointer" :class="[viewMode === 'list' ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-800 dark:text-slate-100 ring-1 ring-slate-200 dark:ring-slate-700' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300']" title="List Layout">
          <List class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>
