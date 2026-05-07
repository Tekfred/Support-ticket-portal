<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  visiblePages: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['set-page'])
</script>

<template>
  <div class="flex justify-between gap-15 px-1 pt-4 md:space-x-12">
    <div class="flex gap-5">
      <button
        class="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        :disabled="currentPage === 1"
        @click="emit('set-page', currentPage - 1)"
      >
        <span class="material-symbols-outlined">keyboard_double_arrow_left</span>
        Previous
      </button>

      <button
        class="grid cursor-pointer grid-cols-4 items-center space-x-2 rounded-full border border-slate-200 bg-[#eef2ff] px-2 text-center font-semibold text-[#40189d] dark:border-slate-700 dark:bg-slate-800 dark:text-[#c8b8ff]"
      >
        <div
          v-for="page in visiblePages"
          :key="page"
          class="flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-[#d8c9ff] dark:hover:bg-slate-700 md:h-7 md:w-7"
          :class="
            page === currentPage
              ? 'border-2 border-[#4B2AAD]/30 ring-2 dark:border-[#a991ff]/50 dark:bg-slate-700'
              : ''
          "
          @click="emit('set-page', page)"
        >
          {{ page }}
        </div>
      </button>

      <button
        class="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700 transition-colors hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        :disabled="currentPage === totalPages"
        @click="emit('set-page', currentPage + 1)"
      >
        Next
        <span class="material-symbols-outlined">keyboard_double_arrow_right</span>
      </button>
    </div>
  </div>
</template>
