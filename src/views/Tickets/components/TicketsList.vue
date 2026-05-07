<script setup>
defineProps({
  applications: {
    type: Array,
    required: true,
  },
  statusClass: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <div class="hidden overflow-x-auto sm:block">
    <table class="w-full min-w-180 border-collapse">
      <thead>
        <tr class="border-b border-[#f0eeff] dark:border-slate-800">
          <th class="w-9 py-3.5 pl-5 text-left">
            <input type="checkbox" class="h-3.75 w-3.75 cursor-pointer accent-[#40189d]" />
          </th>
          <th
            class="px-4 py-3.5 text-left text-[0.7rem] font-semibold tracking-wider whitespace-nowrap text-slate-400 uppercase dark:text-slate-500"
          >
            ID
          </th>
          <th
            class="px-4 py-3.5 text-left text-[0.7rem] font-semibold tracking-wider whitespace-nowrap text-slate-400 uppercase dark:text-slate-500"
          >
            Date Applied
          </th>
          <th
            class="px-4 py-3.5 text-left text-[0.7rem] font-semibold tracking-wider whitespace-nowrap text-slate-400 uppercase dark:text-slate-500"
          >
            Company
          </th>
          <th
            class="px-4 py-3.5 text-left text-[0.7rem] font-semibold tracking-wider whitespace-nowrap text-slate-400 uppercase dark:text-slate-500"
          >
            Type
          </th>
          <th
            class="px-4 py-3.5 text-left text-[0.7rem] font-semibold tracking-wider whitespace-nowrap text-slate-400 uppercase dark:text-slate-500"
          >
            Position
          </th>
          <th
            class="px-4 py-3.5 text-left text-[0.7rem] font-semibold tracking-wider whitespace-nowrap text-slate-400 uppercase dark:text-slate-500"
          >
            Contact
          </th>
          <th
            class="px-4 py-3.5 text-left text-[0.7rem] font-semibold tracking-wider whitespace-nowrap text-slate-400 uppercase dark:text-slate-500"
          >
            Status
          </th>
          <th class="px-4 py-3.5"></th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(app, index) in applications"
          :key="index"
          class="border-b border-[#f5f4ff] transition-colors duration-150 last:border-none hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800/70"
        >
          <td class="w-9 py-3.5 pl-5 align-middle">
            <input type="checkbox" class="h-3.75 w-3.75 cursor-pointer accent-[#40189d]" />
          </td>

          <td
            class="px-4 py-3.5 align-middle text-[0.78rem] font-semibold whitespace-nowrap text-slate-800 dark:text-slate-100"
          >
            {{ app.id }}
          </td>

          <td
            class="px-4 py-3.5 align-middle text-[0.74rem] whitespace-nowrap text-slate-500 dark:text-slate-400"
          >
            {{ app.dateApplied }}
          </td>

          <td class="px-4 py-3.5 align-middle">
            <div class="flex items-center gap-2.5">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-[0.85rem] font-bold text-white md:h-7.5 md:w-7.5 md:rounded-lg"
                :style="{ backgroundColor: app.companyColor }"
              >
                {{ app.companyInitial }}
              </div>
              <div class="flex flex-col gap-0.5">
                <span
                  class="text-[0.78rem] font-semibold whitespace-nowrap text-slate-800 dark:text-slate-100 md:text-[0.73rem]"
                >
                  {{ app.company }}
                </span>
                <span
                  class="text-[0.68rem] whitespace-nowrap text-slate-400 dark:text-slate-500 md:text-[0.63rem]"
                >
                  {{ app.department }}
                </span>
              </div>
            </div>
          </td>

          <td
            class="px-4 py-3.5 align-middle text-[0.74rem] font-semibold tracking-wide whitespace-nowrap text-slate-700 dark:text-slate-200"
          >
            {{ app.type }}
          </td>

          <td
            class="px-4 py-3.5 align-middle text-[0.78rem] whitespace-nowrap text-slate-700 dark:text-slate-300"
          >
            {{ app.position }}
          </td>

          <td class="px-4 py-3.5 align-middle">
            <div class="flex items-center gap-2">
              <span
                v-if="app.hasPhone"
                class="material-symbols-outlined cursor-pointer rounded-full p-1 text-[18px] text-[#40189d] transition-opacity hover:opacity-60 dark:text-[#a991ff]"
                title="Phone"
                >call</span
              >
              <span
                v-if="app.hasEmail"
                class="material-symbols-outlined cursor-pointer rounded-full p-1 text-[18px] text-[#40189d] transition-opacity hover:opacity-60 dark:text-[#a991ff]"
                title="Email"
                >mail</span
              >
              <span
                v-if="!app.hasPhone && !app.hasEmail"
                class="material-symbols-outlined cursor-pointer rounded-full p-1 text-[18px] text-[#40189d] transition-opacity hover:opacity-60 dark:text-[#a991ff]"
                title="Call"
                >call</span
              >
            </div>
          </td>

          <td class="px-4 py-3.5 align-middle">
            <span :class="statusClass(app.status)">{{ app.status }}</span>
          </td>

          <td class="px-4 py-3.5 align-middle">
            <span
              class="material-symbols-outlined cursor-pointer text-[20px] text-slate-400 transition-colors hover:text-[#40189d] dark:text-slate-500 dark:hover:text-[#a991ff]"
            >
              more_vert
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
