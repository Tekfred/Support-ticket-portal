<script setup>
import { ref } from 'vue'
import { MessageSquare, Send } from 'lucide-vue-next'

defineOptions({
  name: 'CommentFeed',
})

defineProps({
  comments: { type: Array, required: true },
})

const emit = defineEmits(['addComment'])

const commentText = ref('')

function handleSubmit() {
  if (!commentText.value.trim()) return
  emit('addComment', commentText.value.trim())
  commentText.value = ''
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 text-left">
    <!-- Header -->
    <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4 font-display">
      <MessageSquare class="h-5 w-5 text-indigo-500" />
      Interactive Case Comments
      <span class="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
        {{ comments.length }} updates
      </span>
    </h3>

    <!-- Comments Feed -->
    <div class="space-y-4 mb-6 max-h-96 overflow-y-auto pr-1">
      <div
        v-if="comments.length === 0"
        class="text-center py-8 text-slate-400 leading-relaxed"
      >
        <p class="text-sm italic">No communications entered yet. Post a comment below to update the customer record.</p>
      </div>

      <div
        v-else
        v-for="comment in comments"
        :key="comment.id"
        class="p-3.5 rounded-xl border flex gap-3 transition-colors"
        :class="[
          comment.author === 'M Mike'
            ? 'bg-indigo-50/50 border-indigo-100 ml-10'
            : 'bg-slate-50/50 border-slate-100 mr-10'
        ]"
      >
        <!-- Avatar -->
        <div
          class="h-8 w-8 rounded-lg font-semibold text-xs flex items-center justify-center shrink-0"
          :class="[comment.author === 'M Mike' ? 'bg-indigo-600 text-white font-display' : 'bg-slate-700 text-white font-mono']"
        >
          {{ comment.author.split(' ').map(n => n[0]).join('').toUpperCase() }}
        </div>

        <!-- Body -->
        <div class="space-y-1.5 flex-1">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <span
              class="text-xs font-bold"
              :class="[comment.author === 'M Mike' ? 'text-indigo-800' : 'text-slate-800']"
            >
              {{ comment.author }}
            </span>
            <span class="text-[10px] text-slate-400 font-mono">{{ comment.date }}</span>
          </div>
          <p class="text-xs leading-relaxed text-slate-700">{{ comment.text }}</p>
        </div>
      </div>
    </div>

    <!-- Input Form -->
    <form @submit.prevent="handleSubmit" class="flex gap-2.5 items-end pt-4 border-t border-slate-100">
      <div class="flex-1">
        <textarea
          rows="2"
          placeholder="Type updates or correspondence notes (e.g. 'Site menu wireframes finished'...)"
          v-model="commentText"
          class="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-sans resize-none bg-slate-50/50"
          required
        />
      </div>
      <button
        type="submit"
        class="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/15 cursor-pointer h-11 shrink-0 self-start"
      >
        <Send class="h-3.5 w-3.5" />
        Send
      </button>
    </form>
  </div>
</template>
