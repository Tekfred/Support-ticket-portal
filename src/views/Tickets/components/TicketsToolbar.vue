<script setup>
defineProps({
  activeFilter: {
    type: String,
    required: true,
  },
  filters: {
    type: Array,
    required: true,
  },
  selectedSort: {
    type: String,
    required: true,
  },
  viewMode: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:activeFilter', 'update:selectedSort', 'update:viewMode'])
</script>

<template>
  <main class="flex items-center justify-between gap-4 p-4 transition-colors">
    <div class="flex flex-1 flex-wrap items-center gap-2">
      <button
        v-for="filter in filters"
        :key="filter"
        class="shrink-0 cursor-pointer rounded-3xl border px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors sm:text-sm"
        :class="[
          activeFilter === filter
            ? 'bg-[#40189d] text-white border-[#40189d] hover:bg-[#35157a]'
            : 'text-[#4b24a3] bg-[#e3d7ff] border-gray-200 hover:bg-[#dcc5f2]',
        ]"
        @click="emit('update:activeFilter', filter)"
      >
        {{ filter }}
      </button>
    </div>

    <div class="relative flex items-center gap-2">
      <button
        type="button"
        class="flex cursor-pointer items-center justify-center border-none transition-colors"
        :class="
          viewMode === 'list'
            ? ' dark:bg-[#7252D3]'
            : 'border border-[#7252D3] dark:border-[#9b8fd9] hover:bg-gray-50 dark:hover:bg-gray-800'
        "
        @click="emit('update:viewMode', 'list')"
      >
        <span
          class="material-symbols-outlined text-[20px]"
          :class="viewMode === 'list' ? 'text-[#bf92e9]' : 'text-[#7252D3] dark:text-[#9b8fd9]'"
          >format_list_bulleted</span
        >
      </button>

      <button
        type="button"
        class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors"
        :class="
          viewMode === 'grid'
            ? 'text-[#4b24a3] dark:bg-[#7252D3] hover:opacity-90 transition-opacity'
            : ' border-[#7252D3] dark:border-[#9b8fd9] hover:bg-gray-50 dark:hover:bg-gray-800'
        "
        @click="emit('update:viewMode', 'grid')"
      >
        <span
          class="material-symbols-outlined text-[20px]"
          :class="viewMode === 'grid' ? 'text-[#bf92e9]' : 'text-[#7252D3] dark:text-[#9b8fd9]'"
          >grid_view</span
        >
      </button>
    </div>

    <div
      class="flex items-center gap-1 rounded-full border border-[#cbd5e1] px-2 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-white sm:px-4 sm:py-2 sm:text-sm"
    >
      <span class="material-symbols-outlined text-[16px] text-slate-600">sort</span>
      <select
        :value="selectedSort"
        class="hidden cursor-pointer appearance-none bg-transparent pr-1 text-slate-500 outline-none sm:inline"
        @change="emit('update:selectedSort', $event.target.value)"
      >
        <option>Newest</option>
        <option>Oldest</option>
        <option>Recent</option>
      </select>
      <span class="material-symbols-outlined cursor-pointer text-[16px] text-slate-600"
        >keyboard_arrow_down</span
      >
    </div>
  </main>
</template>
