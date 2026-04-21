<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <nav class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex items-center justify-between">
      <div class="text-lg font-bold">Support Ticket Portal</div>
      <div>
        <a href="#" class="px-3 py-2 hover:bg-gray-700 rounded">Home</a>
        <a href="#" class="px-3 py-2 hover:bg-gray-700 rounded">Tickets</a>
        <a href="#" class="px-3 py-2 hover:bg-gray-700 rounded">Agents</a>
        <a href="#" class="px-3 py-2 hover:bg-gray-700 rounded">Settings</a>
      </div>
    </div>
  </nav>
</template>
