<script setup>
defineProps({
  applications: {
    type: Array,
    required: true,
  },
  gridColumnsClass: {
    type: String,
    required: true,
  },
  statusClass: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <div class="grid gap-4 p-4" :class="gridColumnsClass">
    <div
      v-for="(app, index) in applications"
      :key="'g' + index"
      class="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="mb-3 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
            :style="{ backgroundColor: app.companyColor }"
          >
            {{ app.companyInitial }}
          </div>
          <div class="flex flex-col gap-0.5">
            <span class="text-[0.78rem] font-semibold text-slate-800 dark:text-slate-100">{{
              app.company
            }}</span>
            <span class="text-[0.65rem] text-slate-400 dark:text-slate-500">{{
              app.department
            }}</span>
          </div>
        </div>
        <span :class="statusClass(app.status)">{{ app.status }}</span>
      </div>

      <div class="mb-3 grid grid-cols-2 gap-2">
        <div class="flex flex-col gap-0.5">
          <span
            class="text-[0.62rem] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500"
            >ID</span
          >
          <span class="text-[0.75rem] font-semibold text-slate-800 dark:text-slate-100">{{
            app.id
          }}</span>
        </div>
        <div class="flex flex-col gap-0.5">
          <span
            class="text-[0.62rem] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500"
            >Type</span
          >
          <span class="text-[0.75rem] font-medium text-slate-800 dark:text-slate-200">{{
            app.type
          }}</span>
        </div>
        <div class="flex flex-col gap-0.5">
          <span
            class="text-[0.62rem] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500"
            >Position</span
          >
          <span class="text-[0.75rem] font-medium text-slate-800 dark:text-slate-200">{{
            app.position
          }}</span>
        </div>
        <div class="flex flex-col gap-0.5">
          <span
            class="text-[0.62rem] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500"
            >Applied</span
          >
          <span class="text-[0.72rem] text-slate-500 dark:text-slate-400">{{
            app.dateApplied
          }}</span>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span
            v-if="app.hasPhone"
            class="material-symbols-outlined cursor-pointer text-[18px] text-[#40189d] dark:text-[#a991ff]"
            >call</span
          >
          <span
            v-if="app.hasEmail"
            class="material-symbols-outlined cursor-pointer text-[18px] text-[#40189d] dark:text-[#a991ff]"
            >mail</span
          >
          <span
            v-if="!app.hasPhone && !app.hasEmail"
            class="material-symbols-outlined cursor-pointer text-[18px] text-[#40189d] dark:text-[#a991ff]"
            >call</span
          >
        </div>
        <span
          class="material-symbols-outlined cursor-pointer text-[20px] text-slate-400 dark:text-slate-500"
          >more_vert</span
        >
      </div>
    </div>
  </div>
</template>
