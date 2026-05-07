<script setup>
import { reactive, ref } from 'vue'

import AppButton from '@/components/AppbuttonV.vue'

const isModalOpen = ref(false)

const ticketForm = reactive({
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  category: '',
  priority: 'Medium',
  description: '',
})

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function handleSubmit() {
  console.log('Ticket draft submitted', { ...ticketForm })
  closeModal()
}
</script>

<template>
  <div class="flex justify-end px-6 py-6">
    <AppButton
      variant="secondary"
      icon="add"
      class="bg-slate-200 px-10 py-4 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
      @click="openModal"
    >
      New Tickets
    </AppButton>
  </div>

  <Teleport to="body">
    <Transition name="ticket-modal">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/25 px-4 py-6 backdrop-blur-sm dark:bg-slate-950/70"
        @click.self="closeModal"
      >
        <form
          class="w-full max-w-2xl rounded-2xl border border-white/70 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_24px_90px_rgba(0,0,0,0.45)]"
          @submit.prevent="handleSubmit"
        >
          <div class="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Add Ticket</h2>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Fill in the ticket details before issuing it.
              </p>
            </div>

            <button
              type="button"
              class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              aria-label="Close ticket form"
              @click="closeModal"
            >
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <label class="flex flex-col gap-1.5">
              <span class="text-sm font-semibold text-slate-700 dark:text-slate-200"
                >Full name</span
              >
              <input
                v-model="ticketForm.fullName"
                type="text"
                required
                placeholder="Enter customer name"
                class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-[#40189d] focus:ring-2 focus:ring-[#40189d]/15 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#a991ff] dark:focus:ring-[#a991ff]/20"
              />
            </label>

            <label class="flex flex-col gap-1.5">
              <span class="text-sm font-semibold text-slate-700 dark:text-slate-200"
                >Email address</span
              >
              <input
                v-model="ticketForm.email"
                type="email"
                required
                placeholder="name@example.com"
                class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-[#40189d] focus:ring-2 focus:ring-[#40189d]/15 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#a991ff] dark:focus:ring-[#a991ff]/20"
              />
            </label>

            <label class="flex flex-col gap-1.5">
              <span class="text-sm font-semibold text-slate-700 dark:text-slate-200"
                >Phone number</span
              >
              <input
                v-model="ticketForm.phone"
                type="tel"
                placeholder="+233 00 000 0000"
                class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-[#40189d] focus:ring-2 focus:ring-[#40189d]/15 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#a991ff] dark:focus:ring-[#a991ff]/20"
              />
            </label>

            <label class="flex flex-col gap-1.5">
              <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Category</span>
              <select
                v-model="ticketForm.category"
                required
                class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-[#40189d] focus:ring-2 focus:ring-[#40189d]/15 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-[#a991ff] dark:focus:ring-[#a991ff]/20"
              >
                <option value="" disabled>Select category</option>
                <option>Billing</option>
                <option>Technical Support</option>
                <option>Account Access</option>
                <option>General Inquiry</option>
              </select>
            </label>

            <label class="flex flex-col gap-1.5 md:col-span-2">
              <span class="text-sm font-semibold text-slate-700 dark:text-slate-200"
                >Ticket subject</span
              >
              <input
                v-model="ticketForm.subject"
                type="text"
                required
                placeholder="Short summary of the issue"
                class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-[#40189d] focus:ring-2 focus:ring-[#40189d]/15 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#a991ff] dark:focus:ring-[#a991ff]/20"
              />
            </label>

            <label class="flex flex-col gap-1.5">
              <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">Priority</span>
              <select
                v-model="ticketForm.priority"
                class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-[#40189d] focus:ring-2 focus:ring-[#40189d]/15 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-[#a991ff] dark:focus:ring-[#a991ff]/20"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </label>

            <label class="flex flex-col gap-1.5 md:col-span-2">
              <span class="text-sm font-semibold text-slate-700 dark:text-slate-200"
                >Description</span
              >
              <textarea
                v-model="ticketForm.description"
                required
                rows="5"
                placeholder="Write the customer's ticket details"
                class="resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-[#40189d] focus:ring-2 focus:ring-[#40189d]/15 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#a991ff] dark:focus:ring-[#a991ff]/20"
              ></textarea>
            </label>
          </div>

          <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <AppButton
              type="button"
              variant="ghost"
              class="justify-center px-6 py-3"
              @click="closeModal"
            >
              Cancel
            </AppButton>
            <AppButton
              type="submit"
              variant="primary"
              icon="confirmation_number"
              class="justify-center px-6 py-3"
            >
              Create Ticket
            </AppButton>
          </div>
        </form>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ticket-modal-enter-active,
.ticket-modal-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.ticket-modal-enter-from,
.ticket-modal-leave-to {
  opacity: 0;
}

.ticket-modal-enter-from form,
.ticket-modal-leave-to form {
  transform: translateY(12px) scale(0.98);
}

.ticket-modal-enter-active form,
.ticket-modal-leave-active form {
  transition: transform 180ms ease;
}
</style>
