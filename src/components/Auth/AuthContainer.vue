<script setup>
</script>

<template>
  <div class="relative flex flex-col items-center justify-center w-full min-h-screen p-4 overflow-hidden select-none bg-slate-950 sm:p-6 lg:p-8">
    <div class="absolute rounded-full pointer-events-none -top-40 -left-40 w-96 h-96 bg-indigo-600/20 blur-3xl" />
    <div class="absolute rounded-full pointer-events-none -bottom-40 -right-40 w-96 h-96 bg-violet-600/20 blur-3xl" />
    <div class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none top-1/2 left-1/2 w-150 h-150 bg-blue-600/10 blur-3xl" />

    <div class="relative z-10 grid w-full max-w-5xl grid-cols-1 overflow-hidden border shadow-2xl bg-slate-900/90 border-slate-800/80 rounded-3xl backdrop-blur-xl lg:grid-cols-12">
      <slot />
    </div>
  </div>
</template>
