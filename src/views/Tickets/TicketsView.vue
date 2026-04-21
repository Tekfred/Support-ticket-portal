<script setup>
import { ref, computed } from "vue";

const allApplications = ref([
  {
    id: "#APL-0003",
    dateApplied: "June 1, 2020, 08:22 AM",
    company: "Mosciski Inc.",
    department: "Creative Design Agency",
    companyColor: "#FF6B35",
    companyInitial: "M",
    type: "FREELANCE",
    position: "Intern UI Designer",
    hasPhone: true,
    hasEmail: true,
    status: "Pending",
  },
  {
    id: "#APL-0002",
    dateApplied: "June 1, 2020, 08:22 AM",
    company: "Funk Inc.",
    department: "IT Department",
    companyColor: "#6B7280",
    companyInitial: "F",
    type: "PART TIME",
    position: "Junior UI Designer",
    hasPhone: true,
    hasEmail: false,
    status: "On-Hold",
  },
  {
    id: "#APL-0003",
    dateApplied: "June 1, 2020, 08:22 AM",
    company: "Mosciski Inc.",
    department: "Creative Design Agency",
    companyColor: "#C026D3",
    companyInitial: "M",
    type: "FREELANCE",
    position: "Intern UI Designer",
    hasPhone: false,
    hasEmail: false,
    status: "Pending",
  },
  {
    id: "#APL-0001",
    dateApplied: "June 1, 2020, 08:22 AM",
    company: "Highspeed Studios",
    department: "Creative Design Agency",
    companyColor: "#0EA5E9",
    companyInitial: "H",
    type: "FULLTIME",
    position: "Senior UX Designer",
    hasPhone: true,
    hasEmail: true,
    status: "Candidate",
  },
  {
    id: "#APL-0002",
    dateApplied: "June 1, 2020, 08:22 AM",
    company: "Funk Inc.",
    department: "IT Department",
    companyColor: "#6B7280",
    companyInitial: "F",
    type: "PART TIME",
    position: "Junior UI Designer",
    hasPhone: false,
    hasEmail: true,
    status: "On-Hold",
  },
  {
    id: "#APL-0001",
    dateApplied: "June 1, 2020, 08:22 AM",
    company: "Highspeed Studios",
    department: "Creative Design Agency",
    companyColor: "#10B981",
    companyInitial: "H",
    type: "FULLTIME",
    position: "Senior UX Designer",
    hasPhone: true,
    hasEmail: true,
    status: "Candidate",
  },
]);


const btnAppLoad = ref([
  {
    id: 1,
    name2: "All",
    name3: "Pending",
    name4: "On-Hold",
    name5: "Candidate",
  },
]);

const currentPage = ref(3);
const selectedSort = ref("Newest");
const perPage = 10;
const totalData = 160;
const totalPages = Math.ceil(totalData / perPage);

const visiblePages = computed(() => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);
  const start = Math.max(1, currentPage.value - 1);
  const end = Math.min(totalPages, start + 3);
  return pages.slice(start - 1, end);
});

function setPage(page) {
  if (page >= 1 && page <= totalPages) currentPage.value = page;
}

function statusClass(status) {
  if (status === "Candidate")
    return "inline-flex items-center justify-center px-3.5 py-1 rounded-full text-[0.7rem] font-semibold whitespace-nowrap bg-[#40189d] text-white";
  if (status === "On-Hold")
    return "inline-flex items-center justify-center px-3.5 py-1 rounded-full text-[0.7rem] font-semibold whitespace-nowrap border border-amber-400 text-amber-600";
  return "inline-flex items-center justify-center px-3.5 py-1 rounded-full text-[0.7rem] font-semibold whitespace-nowrap border border-gray-300 text-gray-500";
}
</script>

<template>
  <!-- Wrapper -->

  <main class="flex justify-between items-center p-4  transition-colors">
    <section
      class="flex flex-nowrap sm:flex-wrap gap-2 space-x-3 mt-4 overflow-x-auto pb-2 scrollbar-hide"
      v-for="btnAppLoad in btnAppLoad"
      :key="btnAppLoad"
    >
      <div class="text-xs sm:text-sm">
        <h1 class="font-semibold text-sm sm:text-base text-slate-800 ">
          Older Tickets
        </h1>
        <p class="text-slate-500 text-xs">Based your preference</p>
      </div>


        <button
        class="text-xs sm:text-sm font-semibold rounded-3xl px-5 py-3 flex gap-2 bg-[#40189d] cursor-pointer text-white whitespace-nowrap shrink-0 hover:bg-[#35157a] transition-colors"
      >
        {{ btnAppLoad.name2 }}
      </button>
      <button
        class="text-xs sm:text-sm text-[#4b24a3] font-semibold rounded-3xl px-5 py-3 flex gap-2 bg-[#e3d7ff] cursor-pointer whitespace-nowrap shrink-0 border border-gray-200 hover:bg-[#dcc5f2] transition-colors"
      >
        {{ btnAppLoad.name3 }}
      </button>
      <button
        class="text-xs sm:text-sm text-[#4b24a3] font-semibold rounded-3xl px-5 py-3 flex gap-2 bg-[#e3d7ff] cursor-pointer whitespace-nowrap shrink-0 border border-gray-200 hover:bg-[#dcc5f2] transition-colors"
      >
        {{ btnAppLoad.name4 }}
      </button>
      <button
        class="text-xs sm:text-sm text-[#4b24a3] font-semibold rounded-3xl px-5 py-3 flex gap-2 bg-[#e3d7ff] cursor-pointer whitespace-nowrap shrink-0 border border-gray-200 hover:bg-[#dcc5f2] transition-colors"
      >
        {{ btnAppLoad.name5 }}
      </button>

    </section>

    <div
        class="flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 border border-[#cbd5e1] rounded-full text-xs sm:text-sm font-medium text-slate-700 hover:bg-white transition-colors"
      >
        <span class="material-symbols-outlined text-[16px] text-slate-600">sort</span>
        <select
          v-model="selectedSort"
          class="hidden sm:inline bg-transparent text-slate-500 outline-none appearance-none pr-1 cursor-pointer"
        >
          <option>Newest</option>
          <option>Oldest</option>
          <option>Recent</option>
        </select>
        <span
          class="material-symbols-outlined text-slate-600 cursor-pointer text-[16px]"
          >keyboard_arrow_down</span
        >
      </div>




  </main>
  <div class="px-4 pb-6 font-sans  transition-colors">

    <!-- ── Table Card ─────────────────────────────────── -->
    <div class="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.08)]">

      <!-- Desktop / Medium table (hidden on sm) -->
      <div class="hidden sm:block overflow-x-auto">
        <table class="w-full border-collapse min-w-180">

          <!-- Head -->
          <thead>
            <tr class="border-b border-[#f0eeff]">
              <th class="w-9 pl-5 py-3.5 text-left">
                <input type="checkbox" class="w-3.75 h-3.75 accent-[#40189d] cursor-pointer" />
              </th>
              <th class="py-3.5 px-4 text-left text-[0.7rem] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">ID</th>
              <th class="py-3.5 px-4 text-left text-[0.7rem] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">Date Applied</th>
              <th class="py-3.5 px-4 text-left text-[0.7rem] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">Company</th>
              <th class="py-3.5 px-4 text-left text-[0.7rem] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">Type</th>
              <th class="py-3.5 px-4 text-left text-[0.7rem] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">Position</th>
              <th class="py-3.5 px-4 text-left text-[0.7rem] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">Contact</th>
              <th class="py-3.5 px-4 text-left text-[0.7rem] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">Status</th>
              <th class="py-3.5 px-4"></th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody>
            <tr
              v-for="(app, index) in allApplications"
              :key="index"
              class="border-b border-[#f5f4ff] last:border-none transition-colors duration-150 hover:bg-slate-100"
            >
              <!-- Checkbox -->
              <td class="pl-5 py-3.5 align-middle w-9">
                <input type="checkbox" class="w-3.75 h-3.75 accent-[#40189d] cursor-pointer" />
              </td>

              <!-- ID -->
              <td class="px-4 py-3.5 align-middle text-[0.78rem] font-semibold text-slate-800 whitespace-nowrap">
                {{ app.id }}
              </td>

              <!-- Date Applied -->
              <td class="px-4 py-3.5 align-middle text-[0.74rem] text-slate-500 whitespace-nowrap">
                {{ app.dateApplied }}
              </td>

              <!-- Company -->
              <td class="px-4 py-3.5 align-middle">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-bold text-[0.85rem] shrink-0 md:w-7.5 md:h-7.5 md:rounded-lg"
                    :style="{ backgroundColor: app.companyColor }"
                  >
                    {{ app.companyInitial }}
                  </div>
                  <div class="flex flex-col gap-0.5">
                    <span class="font-semibold text-[0.78rem] text-slate-800 whitespace-nowrap md:text-[0.73rem]">
                      {{ app.company }}
                    </span>
                    <span class="text-[0.68rem] text-slate-400 whitespace-nowrap md:text-[0.63rem]">
                      {{ app.department }}
                    </span>
                  </div>
                </div>
              </td>

              <!-- Type -->
              <td class="px-4 py-3.5 align-middle text-[0.74rem] font-semibold text-slate-700 whitespace-nowrap tracking-wide">
                {{ app.type }}
              </td>

              <!-- Position -->
              <td class="px-4 py-3.5 align-middle text-[0.78rem] text-slate-700 whitespace-nowrap">
                {{ app.position }}
              </td>

              <!-- Contact -->
              <td class="px-4 py-3.5 align-middle">
                <div class="flex items-center gap-2">
                  <span
                    v-if="app.hasPhone"
                    class="material-symbols-outlined text-[18px] text-[#40189d] cursor-pointer rounded-full p-1 transition-opacity hover:opacity-60"
                    title="Phone"
                  >call</span>
                  <span
                    v-if="app.hasEmail"
                    class="material-symbols-outlined text-[18px] text-[#40189d] cursor-pointer rounded-full p-1 transition-opacity hover:opacity-60"
                    title="Email"
                  >mail</span>
                  <span
                    v-if="!app.hasPhone && !app.hasEmail"
                    class="material-symbols-outlined text-[18px] text-[#40189d] cursor-pointer rounded-full p-1 transition-opacity hover:opacity-60"
                    title="Call"
                  >call</span>
                </div>
              </td>

              <!-- Status -->
              <td class="px-4 py-3.5 align-middle">
                <span :class="statusClass(app.status)">{{ app.status }}</span>
              </td>

              <!-- More -->
              <td class="px-4 py-3.5 align-middle">
                <span class="material-symbols-outlined text-[20px] text-slate-400 cursor-pointer transition-colors hover:text-[#40189d]">
                  more_vert
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ── Mobile Card View (sm only) ─────────────── -->
      <div class="block sm:hidden">
        <div
          v-for="(app, index) in allApplications"
          :key="'m' + index"
          class="px-4 py-3.5 border-b border-[#f0eeff] last:border-none"
        >
          <!-- Top row: company + status -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2.5">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                :style="{ backgroundColor: app.companyColor }"
              >
                {{ app.companyInitial }}
              </div>
              <div class="flex flex-col gap-0.5">
                <span class="font-semibold text-[0.78rem] text-slate-800">{{ app.company }}</span>
                <span class="text-[0.65rem] text-slate-400">{{ app.department }}</span>
              </div>
            </div>
            <span :class="statusClass(app.status)">{{ app.status }}</span>
          </div>

          <!-- Grid body -->
          <div class="grid grid-cols-2 gap-2 mb-3">
            <div class="flex flex-col gap-0.5">
              <span class="text-[0.62rem] text-slate-400 uppercase font-semibold tracking-wider">ID</span>
              <span class="text-[0.75rem] font-semibold text-slate-800">{{ app.id }}</span>
            </div>
            <div class="flex flex-col gap-0.5">
              <span class="text-[0.62rem] text-slate-400 uppercase font-semibold tracking-wider">Type</span>
              <span class="text-[0.75rem] font-medium text-slate-800">{{ app.type }}</span>
            </div>
            <div class="flex flex-col gap-0.5">
              <span class="text-[0.62rem] text-slate-400 uppercase font-semibold tracking-wider">Position</span>
              <span class="text-[0.75rem] font-medium text-slate-800">{{ app.position }}</span>
            </div>
            <div class="flex flex-col gap-0.5">
              <span class="text-[0.62rem] text-slate-400 uppercase font-semibold tracking-wider">Applied</span>
              <span class="text-[0.72rem] text-slate-500">{{ app.dateApplied }}</span>
            </div>
          </div>

          <!-- Footer: contact + more -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span
                v-if="app.hasPhone"
                class="material-symbols-outlined text-[18px] text-[#40189d] cursor-pointer"
              >call</span>
              <span
                v-if="app.hasEmail"
                class="material-symbols-outlined text-[18px] text-[#40189d] cursor-pointer"
              >mail</span>
              <span
                v-if="!app.hasPhone && !app.hasEmail"
                class="material-symbols-outlined text-[18px] text-[#40189d] cursor-pointer"
              >call</span>
            </div>
            <span class="material-symbols-outlined text-[20px] text-slate-400 cursor-pointer">more_vert</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Pagination ──────────────────────────────────── -->
    <div class="flex justify-between gap-15 md:space-x-12 pt-4 px-1">


      <div class="flex gap-5">
        <!-- Previous -->
        <button
          class="text-sm font-semibold text-slate-700 flex gap-2 bg-white hover:bg-[#f8fafc] px-3 py-1 rounded-full items-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-slate-200"
          :disabled="currentPage === 1"
          @click="setPage(currentPage - 1)"
        >
          <span class="material-symbols-outlined">keyboard_double_arrow_left</span>
          Previous
        </button>

        <!-- Page numbers pill -->
        <button class="grid grid-cols-4 space-x-2 bg-[#eef2ff] font-semibold text-[#40189d] text-center items-center px-2 rounded-full cursor-pointer border border-slate-200">
          <div
            v-for="page in visiblePages"
            :key="page"
            class="w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center hover:bg-[#d8c9ff] transition-colors"
            :class="page === currentPage ? 'border-2 border-[#4B2AAD]/30 ring-2' : ''"
            @click="setPage(page)"
          >{{ page }}</div>
        </button>

        <!-- Next -->
        <button
          class="text-sm font-semibold text-slate-700 flex gap-2 bg-white hover:bg-[#f8fafc] px-3 py-1 rounded-full items-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-slate-200"
          :disabled="currentPage === totalPages"
          @click="setPage(currentPage + 1)"
        >
          Next
          <span class="material-symbols-outlined">keyboard_double_arrow_right</span>
        </button>
      </div>
    </div>



  </div>

  <div class="text-end px-65 ">
    <button class="text-slate-600 cursor-pointer rounded-lg border border-slate-300 bg-slate-100 absolute bottom-10 px-20 py-5 " >
        <span class="material-symbols-outlined">add</span>
        <h1 class="font-bold">New Tickets</h1>
      </button>
  </div>


</template>
