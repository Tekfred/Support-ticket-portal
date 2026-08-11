<script setup>
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  LogIn,
  UserPlus
} from 'lucide-vue-next'

defineOptions({
  name: 'AuthFormPanel',
})

defineProps({
  authMode: {
    type: String,
    default: 'login'
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  fullName: {
    type: String,
    default: ''
  },
  department: {
    type: String,
    default: 'Desk Operations'
  },
  role: {
    type: String,
    default: 'Desk Agent'
  },
  rememberMe: {
    type: Boolean,
    default: true
  },
  termsAccepted: {
    type: Boolean,
    default: false
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  successMessage: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  departments: {
    type: Array,
    default: () => []
  },
  roles: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'update:authMode',
  'update:email',
  'update:password',
  'update:fullName',
  'update:department',
  'update:role',
  'update:rememberMe',
  'update:termsAccepted',
  'update:showPassword',
  'submit',
  'forgotPassword'
])

const toggleAuthMode = (mode) => {
  emit('update:authMode', mode)
}

const handleForgotPassword = () => {
  emit('forgotPassword')
}

const handleSubmit = () => {
  emit('submit')
}
</script>

<template>
  <div class="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
    <div class="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
      <div>
        <h3 class="text-xl font-bold font-display text-white">
          {{ authMode === 'login' ? 'Welcome Back' : 'Create Agent Account' }}
        </h3>
        <p class="text-xs text-slate-400 mt-1">
          {{ authMode === 'login' ? 'Enter your credentials to access your support dashboard.' : 'Register a new support agent or operator account.' }}
        </p>
      </div>

      <div class="bg-slate-950 p-1 rounded-2xl border border-slate-800 flex items-center gap-1 shrink-0">
        <button
          @click="toggleAuthMode('login')"
          type="button"
          class="px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
          :class="[authMode === 'login' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white']"
        >
          <LogIn class="h-3.5 w-3.5" />
          Sign In
        </button>
        <button
          @click="toggleAuthMode('signup')"
          type="button"
          class="px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
          :class="[authMode === 'signup' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white']"
        >
          <UserPlus class="h-3.5 w-3.5" />
          Sign Up
        </button>
      </div>
    </div>

    <div v-if="errorMessage" class="mb-6 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
      <AlertCircle class="h-4 w-4 shrink-0 text-rose-400" />
      <span>{{ errorMessage }}</span>
    </div>

    <div v-if="successMessage" class="mb-6 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
      <CheckCircle2 class="h-4 w-4 shrink-0 text-emerald-400" />
      <span>{{ successMessage }}</span>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div v-if="authMode === 'signup'">
        <label class="block text-xs font-medium text-slate-300 mb-1.5 font-display">
          Full Name
        </label>
        <div class="relative">
          <User class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            :value="fullName"
            @input="$emit('update:fullName', $event.target.value)"
            type="text"
            placeholder="e.g. Eleanor Pena"
            class="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            required
          />
        </div>
      </div>

      <div>
        <label class="block text-xs font-medium text-slate-300 mb-1.5 font-display">
          Work Email Address
        </label>
        <div class="relative">
          <Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            :value="email"
            @input="$emit('update:email', $event.target.value)"
            type="email"
            placeholder="name@company.com"
            class="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            required
          />
        </div>
      </div>

      <div v-if="authMode === 'signup'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1.5 font-display">
            Role Title
          </label>
          <select
            :value="role"
            @change="$emit('update:role', $event.target.value)"
            class="w-full bg-slate-950 border border-slate-800 rounded-2xl px-3 py-3 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1.5 font-display">
            Department
          </label>
          <select
            :value="department"
            @change="$emit('update:department', $event.target.value)"
            class="w-full bg-slate-950 border border-slate-800 rounded-2xl px-3 py-3 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option v-for="d in departments" :key="d" :value="d">{{ d }}</option>
          </select>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label class="block text-xs font-medium text-slate-300 font-display">
            Password
          </label>
          <a v-if="authMode === 'login'" href="#" @click.prevent="handleForgotPassword" class="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors">
            Forgot password?
          </a>
        </div>
        <div class="relative">
          <Lock class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            :value="password"
            @input="$emit('update:password', $event.target.value)"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••••••"
            class="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors font-mono"
            required
          />
          <button
            type="button"
            @click="$emit('update:showPassword', !showPassword)"
            class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            <EyeOff v-if="showPassword" class="h-4 w-4" />
            <Eye v-else class="h-4 w-4" />
          </button>
        </div>
      </div>

      <div v-if="authMode === 'login'" class="flex items-center justify-between pt-1">
        <label class="flex items-center gap-2 cursor-pointer select-none">
          <input
            :checked="rememberMe"
            @change="$emit('update:rememberMe', $event.target.checked)"
            type="checkbox"
            class="rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
          />
          <span class="text-xs text-slate-400">Keep me signed in</span>
        </label>
      </div>

      <div v-if="authMode === 'signup'" class="pt-1">
        <label class="flex items-start gap-2 cursor-pointer select-none">
          <input
            :checked="termsAccepted"
            @change="$emit('update:termsAccepted', $event.target.checked)"
            type="checkbox"
            class="rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500 h-4 w-4 mt-0.5 shrink-0"
          />
          <span class="text-[11px] text-slate-400 leading-normal">
            I agree to the <span class="text-indigo-400 font-semibold">Terms of Service</span> and acknowledge the security protocol guidelines.
          </span>
        </label>
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="w-full mt-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-xs disabled:opacity-60"
      >
        <template v-if="isLoading">
          <div class="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Authenticating...</span>
        </template>
        <template v-else>
          <span>{{ authMode === 'login' ? 'Sign In to Console' : 'Register New Account' }}</span>
          <ArrowRight class="h-4 w-4" />
        </template>
      </button>
    </form>
  </div>
</template>