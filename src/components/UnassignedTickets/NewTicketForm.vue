
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['create', 'close'])

const company = ref('')
const category = ref('')
const position = ref('')
const type = ref('FULLTIME')
const status = ref('Pending')
const department = ref('Support Operations')
const priority = ref('medium')
const email = ref('')
const phone = ref('')
const description = ref('')

const resetForm = () => {
  company.value = ''
  category.value = ''
  position.value = ''
  type.value = 'FULLTIME'
  status.value = 'Pending'
  department.value = 'Support Operations'
  priority.value = 'medium'
  email.value = ''
  phone.value = ''
  description.value = ''
}

const onSubmit = () => {
  if (!company.value || !position.value || !description.value) {
    window.alert('Please fill out the Company, Position, and Description fields.')
    return
  }

  emit('create', {
    company: company.value,
    category: category.value || 'Support Operations',
    position: position.value,
    type: type.value,
    status: status.value,
    department: department.value,
    priority: priority.value,
    email: email.value || 'customer@example.com',
    phone: phone.value || '+1 (555) 012-3456',
    description: description.value,
  })

  resetForm()
  emit('close')
}

const onDiscard = () => {
  resetForm()
  emit('close')
}
</script>
<template>
  <form @submit.prevent="onSubmit" class="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-label text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Company Name *</label>
        <input v-model="company" type="text" required placeholder="e.g. Mosciski Inc." class="w-full text-data p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans dark:placeholder-slate-500 transition-colors" />
      </div>
      <div>
        <label class="block text-label text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Category</label>
        <input v-model="category" type="text" placeholder="e.g. Creative Design Agency" class="w-full text-data p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans dark:placeholder-slate-500 transition-colors" />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-label text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Target Title *</label>
        <input v-model="position" type="text" required placeholder="e.g. Intern UI Designer" class="w-full text-data p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans dark:placeholder-slate-500 transition-colors" />
      </div>
      <div>
        <label class="block text-label text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Department</label>
        <input v-model="department" type="text" class="w-full text-data p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans dark:placeholder-slate-500 transition-colors" />
      </div>
    </div>

    <div class="grid grid-cols-3 gap-3">
      <div>
        <label class="block text-label text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Contract Type</label>
        <select v-model="type" class="w-full text-data p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 font-medium cursor-pointer transition-colors">
          <option value="FREELANCE">Freelance</option>
          <option value="PART TIME">Part Time</option>
          <option value="FULLTIME">Fulltime</option>
        </select>
      </div>
      <div>
        <label class="block text-label text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Status</label>
        <select v-model="status" class="w-full text-data p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 font-medium cursor-pointer transition-colors">
          <option value="Pending">Pending</option>
          <option value="On-Hold">On-Hold</option>
          <option value="Candidate">Candidate</option>
        </select>
      </div>
      <div>
        <label class="block text-label text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Priority</label>
        <select v-model="priority" class="w-full text-data p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 font-medium cursor-pointer transition-colors">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-label text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Email address</label>
        <input v-model="email" type="email" placeholder="customer@net.com" class="w-full text-data p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans dark:placeholder-slate-500 transition-colors" />
      </div>
      <div>
        <label class="block text-label text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Phone line</label>
        <input v-model="phone" type="text" placeholder="+1 (555) 000-0000" class="w-full text-data p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans dark:placeholder-slate-500 transition-colors" />
      </div>
    </div>

    <div>
        <label class="block text-label text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Support Issue Details *</label>
      <textarea v-model="description" rows="4" placeholder="Provide a functional overview of the customer's request, luggage challenges, or transport issues..." class="w-full text-data p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none focus:border-indigo-500 font-sans resize-none dark:placeholder-slate-500 transition-colors" required></textarea>
    </div>

    <div class="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-end gap-3">
      <button type="button" @click="onDiscard" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-data font-bold transition-all cursor-pointer">Discard</button>
      <button type="submit" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-data font-bold transition-all shadow-md shadow-indigo-600/10 cursor-pointer">Release Ticket</button>
    </div>
  </form>
</template>
