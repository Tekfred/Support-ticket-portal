<script>
import AppButton from '@/components/AppbuttonV.vue'

export default {
  components: {
    AppButton,
  },
  methods: {
    handleNewTicket() {
      // later: open a modal, or navigate to submit page
      console.log('New ticket button clicked')
    },
  },
}
</script>

<template>

    <!-- AFTER — using the reusable component -->
  <div class="text-end px-65">
  <AppButton
    variant="secondary"
    icon="add"
    class="absolute bottom-10 right-10 px-20 py-6 bg-slate-200"
    @click="handleNewTicket"
  >
    New Tickets
  </AppButton>
</div>
</template>
