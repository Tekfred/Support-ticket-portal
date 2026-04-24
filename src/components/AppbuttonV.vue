<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'   // 'primary' | 'secondary' | 'ghost'
  },
  icon: {
    type: String,
    default: null        // material icon name e.g. 'add'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<template>
  <button
    :disabled="disabled || loading"
    @click="$emit('click')"
    :class="[
      'flex items-center gap-2 font-bold rounded-lg border cursor-pointer transition-colors',
      variant === 'primary'   && 'bg-[#40189d] text-white border-transparent hover:bg-[#35157a]',
      variant === 'secondary' && 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200',
      variant === 'ghost'     && 'bg-transparent text-[#40189d] border-[#40189d] hover:bg-[#f3eeff]',
      (disabled || loading)   && 'opacity-50 cursor-not-allowed'
    ]"
  >
    <span v-if="loading" class="material-symbols-outlined animate-spin text-[20px]">
      progress_activity
    </span>
    <span v-else-if="icon" class="material-symbols-outlined text-[20px]">
      {{ icon }}
    </span>

    <slot />   <!-- 👈 this is where "New Tickets" text goes in -->

  </button>
</template>
