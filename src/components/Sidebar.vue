<script setup>
import {
  Inbox,
  Briefcase,
  CalendarDays,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LifeBuoy,
  Sparkles,
} from 'lucide-vue-next'

defineOptions({
  name: 'SupportSidebar',
})

const props = defineProps({
  activeTab: {
    type: String,
    required: true,
  },
  isCollapsed: {
    type: Boolean,
    required: true,
  },
  myTicketsCount: {
    type: Number,
    required: true,
  },
  unassignedCount: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['selectTab', 'setIsCollapsed'])

const menuItems = [
  {
    id: 'unassigned',
    label: 'Unassigned Tickets',
    icon: Inbox,
    getBadge: () => props.unassignedCount,
    badgeColor: 'bg-indigo-500 text-white',
    description: 'Backlog / Open queue',
  },
  {
    id: 'my-tickets',
    label: 'My Tickets',
    icon: Briefcase,
    getBadge: () => props.myTicketsCount,
    badgeColor: 'bg-emerald-500 text-white',
    description: 'Accepted & in progress',
  },
  {
    id: 'booked-tickets',
    label: 'Booked Workspace',
    icon: CalendarDays,
    getBadge: () => null,
    description: 'Active & upcoming transits',
  },
  {
    id: 'analytics',
    label: 'Performance & Insights',
    icon: BarChart3,
    getBadge: () => null,
    description: 'Metrics & real-time efficiency',
  },
]
</script>

<template>
  <aside
    class="relative h-screen bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 ease-in-out z-30 font-sans"
    :class="[isCollapsed ? 'w-20' : 'w-72']"
    id="main-sidebar"
  >
    <!-- Brand Header -->
    <div class="h-20 flex items-center justify-between px-5 border-b border-slate-800">
      <div class="flex items-center gap-3 overflow-hidden">
        <div
          class="h-10 w-10 shrink-0 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20"
        >
          <LifeBuoy class="h-5 w-5 animate-pulse" />
        </div>
        <div v-if="!isCollapsed" class="flex flex-col">
          <span class="text-white font-display font-semibold tracking-tight text-lg">
            VeloPort
          </span>
          <span
            class="text-indigo-400 font-mono text-[10px] tracking-widest font-semibold uppercase"
          >
            Booking Support
          </span>
        </div>
      </div>

      <!-- Collapse Trigger Arrow -->
      <button
        v-if="!isCollapsed"
        @click="emit('setIsCollapsed', true)"
        class="p-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        id="sidebar-collapse-btn-inner"
        title="Collapse Sidebar"
      >
        <ChevronLeft class="h-4 w-4" />
      </button>
    </div>

    <!-- Main Navigation Menu -->
    <div class="flex-1 py-8 px-4 space-y-8 overflow-y-auto">
      <div>
        <p
          v-if="!isCollapsed"
          class="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3"
        >
          Support Views
        </p>
        <nav class="space-y-1.5" id="sidebar-nav">
          <button
            v-for="item in menuItems"
            :key="item.id"
            @click="emit('selectTab', item.id)"
            :id="`nav-item-${item.id}`"
            class="w-full group flex items-center justify-between p-3 rounded-xl transition-all duration-200 outline-none cursor-pointer relative"
            :class="[
              activeTab === item.id
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/10'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100',
            ]"
            :title="item.label"
          >
            <div class="flex items-center gap-3">
              <component
                :is="item.icon"
                class="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110"
                :class="[
                  activeTab === item.id
                    ? 'text-white'
                    : 'text-slate-400 group-hover:text-indigo-400',
                ]"
              />
              <div v-if="!isCollapsed" class="text-left">
                <p class="text-sm font-medium leading-none">
                  {{ item.label }}
                </p>
                <p
                  class="text-[10px] mt-1 font-light"
                  :class="[activeTab === item.id ? 'text-indigo-200' : 'text-slate-500']"
                >
                  {{ item.description }}
                </p>
              </div>
            </div>

            <!-- Badges -->
            <span
              v-if="item.getBadge() !== null && !isCollapsed"
              class="px-2 py-0.5 rounded-full text-[11px] font-semibold font-mono"
              :class="item.badgeColor"
            >
              {{ item.getBadge() }}
            </span>
            <span
              v-if="item.getBadge() !== null && isCollapsed"
              class="absolute -top-1 -right-1 h-4 w-4 bg-indigo-500 border-2 border-slate-900 rounded-full flex items-center justify-center text-[8px] font-bold text-white z-10"
            >
              {{ item.getBadge() }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Collapsed view toggle button for when collapsed -->
      <div v-if="isCollapsed" class="flex justify-center">
        <button
          @click="emit('setIsCollapsed', false)"
          class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-white cursor-pointer"
          title="Expand Sidebar"
        >
          <ChevronRight class="h-5 w-5" />
        </button>
      </div>

      <!-- Quick System Health Metric Panel -->
      <div v-if="!isCollapsed" class="p-4 rounded-xl bg-slate-800/40 border border-slate-800/50">
        <div class="flex items-center gap-2 mb-2">
          <Sparkles class="h-4 w-4 text-amber-400 animate-spin" />
          <span class="text-[11px] font-semibold text-slate-300 font-display"
            >Priority Grounding</span
          >
        </div>
        <p class="text-[11px] text-slate-500 leading-relaxed font-sans">
          Dynamic workload balancers are operational. Ticket escalations are synchronized with
          active storage depots.
        </p>
      </div>
    </div>

    <!-- Logged in Agent Card / Footer -->
    <div class="p-4 border-t border-slate-800 bg-slate-950/40">
      <div
        class="flex items-center gap-3"
        :class="[isCollapsed ? 'justify-center' : 'justify-between']"
      >
        <div class="flex items-center gap-3 overflow-hidden">
          <div
            class="h-10 w-10 rounded-xl bg-linear-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-bold select-none text-sm shrink-0 shadow-lg shadow-indigo-600/20 border border-indigo-400/20 animate-none"
          >
            MM
          </div>
          <div v-if="!isCollapsed" class="text-left overflow-hidden">
            <p class="text-sm font-semibold text-white leading-none truncate font-display">
              M Mike
            </p>
            <p class="text-xs text-slate-500 truncate font-mono mt-1">ansahaudi86@gmail.com</p>
          </div>
        </div>
        <div
          v-if="!isCollapsed"
          class="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/10"
          title="Online"
        />
      </div>
    </div>
  </aside>
</template>
