<script setup>
import { Inbox, Briefcase, CalendarDays, BarChart3, LogOut } from 'lucide-vue-next'

defineOptions({ name: 'BottomNav' })

defineProps({
  activeTab: { type: String, required: true },
})

const emit = defineEmits(['selectTab', 'logout'])

const menuItems = [
  { id: 'unassigned',    label: 'Backlog',     icon: Inbox },
  { id: 'my-tickets',    label: 'My Tickets',  icon: Briefcase },
  { id: 'booked-tickets', label: 'Bookings',   icon: CalendarDays },
  { id: 'analytics',     label: 'Dashboard',   icon: BarChart3 },
]

const emitLogout = () => {
  emit('logout')
}

const selectTab = (tabId) => {
  emit('selectTab', tabId)
}
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50 lg:hidden" id="mobile-bottom-nav">
    <div
      class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60"
      style="padding-bottom: env(safe-area-inset-bottom)"
    >
      <div class="flex items-center justify-around h-14">
        <button
          v-for="item in menuItems"
          :key="item.id"
          @click="selectTab(item.id)"
          class="flex flex-col items-center justify-center gap-0.5 h-full w-full py-1.5 transition-colors relative"
          :class="activeTab === item.id ? 'text-brand-600' : 'text-slate-400 dark:text-slate-500'"
        >
          <component
            :is="item.icon"
            class="h-5 w-5 transition-transform duration-200"
            :class="activeTab === item.id ? 'scale-110' : ''"
          />
          <span
            class="text-[10px] font-medium leading-none"
            :class="activeTab === item.id ? 'font-semibold text-brand-600' : ''"
          >
            {{ item.label }}
          </span>
          <span
            v-if="activeTab === item.id"
            class="absolute top-1 h-0.5 w-4 bg-brand-600 rounded-full"
          />
        </button>
        <button
          @click="emitLogout"
          class="flex flex-col items-center justify-center gap-0.5 h-full w-full py-1.5 transition-colors relative text-slate-400 dark:text-slate-500"
        >
          <LogOut class="h-5 w-5" />
          <span class="text-[10px] font-medium leading-none">Logout</span>
        </button>
      </div>
    </div>
  </nav>
</template>
