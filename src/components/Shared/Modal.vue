<script setup>
import { defineEmits, defineProps } from 'vue'

defineOptions({
  name: 'BaseModal',
})

defineProps({
  show: { type: Boolean, default: false },
})
const emit = defineEmits(['update:show'])

function close() {
  emit('update:show', false)
}
</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      id="modal-container"
    >
      <div class="absolute inset-0" @click="close" />
      <div
        class="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl relative z-10 border border-slate-200 dark:border-slate-700 overflow-hidden text-left transition-colors"
      >
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.95) translateY(15px);
  opacity: 0;
}
</style>
