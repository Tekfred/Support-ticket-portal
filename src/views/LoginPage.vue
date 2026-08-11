<script setup>
import { ref } from 'vue'
import AuthContainer from '@/components/Auth/AuthContainer.vue'
import AuthBrandPanel from '@/components/Auth/AuthBrandPanel.vue'
import AuthFormPanel from '@/components/Auth/AuthFormPanel.vue'

const emit = defineEmits(['loginSuccess'])

const authMode = ref('login')
const email = ref('')
const password = ref('')
const fullName = ref('')
const department = ref('Desk Operations')
const role = ref('Desk Agent')
const rememberMe = ref(true)
const termsAccepted = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

const departments = [
  'Desk Operations',
  'Luggage Storage Ops',
  'Customer Care & Logistics',
  'Technical Support',
  'Security & Transport',
]

const roles = ['Desk Agent', 'Operations Lead', 'Support Specialist', 'System Administrator']

const getInitials = (name) => {
  if (!name) return 'VP'
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

const selectDemoAccount = (account) => {
  email.value = account.email
  password.value = 'TicketBase2026'
  errorMessage.value = ''

  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    const user = {
      name: account.name,
      email: account.email,
      role: account.role,
      department: account.department,
      initials: account.initials || getInitials(account.name),
    }
    emit('loginSuccess', user)
  }, 400)
}

const handleSubmit = () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!email.value || !email.value.includes('@')) {
    errorMessage.value = 'Please enter a valid email address.'
    return
  }

  if (!password.value || password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters long.'
    return
  }

  if (authMode.value === 'signup') {
    if (!fullName.value.trim()) {
      errorMessage.value = 'Please provide your full name.'
      return
    }
    if (!termsAccepted.value) {
      errorMessage.value = 'You must agree to the Terms of Service to create an account.'
      return
    }
  }

  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false

    if (authMode.value === 'login') {
      const registeredUsers = JSON.parse(localStorage.getItem('booking_support_users') || '[]')
      const matchedUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.value.toLowerCase(),
      )

      if (matchedUser) {
        emit('loginSuccess', matchedUser)
      } else {
        const userObj = {
          name: fullName.value || email.value.split('@')[0].replace('.', ' '),
          email: email.value.toLowerCase(),
          role: role.value,
          department: department.value,
          initials: getInitials(fullName.value || email.value),
        }
        emit('loginSuccess', userObj)
      }
    } else {
      const newUser = {
        name: fullName.value.trim(),
        email: email.value.toLowerCase().trim(),
        role: role.value,
        department: department.value,
        initials: getInitials(fullName.value),
        createdAt: new Date().toISOString(),
      }

      const existingUsers = JSON.parse(localStorage.getItem('booking_support_users') || '[]')
      const filtered = existingUsers.filter((u) => u.email.toLowerCase() !== newUser.email)
      filtered.push(newUser)
      localStorage.setItem('booking_support_users', JSON.stringify(filtered))

      successMessage.value = 'Account created successfully! Redirecting...'
      setTimeout(() => {
        emit('loginSuccess', newUser)
      }, 600)
    }
  }, 600)
}

const handleForgotPassword = () => {
  errorMessage.value = 'Password reset instructions have been dispatched to your email address.'
}
</script>

<template>
  <AuthContainer>
    <AuthBrandPanel @selectDemo="selectDemoAccount" />
    <AuthFormPanel
      :authMode="authMode"
      :email="email"
      :password="password"
      :fullName="fullName"
      :department="department"
      :role="role"
      :rememberMe="rememberMe"
      :termsAccepted="termsAccepted"
      :showPassword="showPassword"
      :errorMessage="errorMessage"
      :successMessage="successMessage"
      :isLoading="isLoading"
      :departments="departments"
      :roles="roles"
      @update:authMode="(val) => (authMode = val)"
      @update:email="(val) => (email = val)"
      @update:password="(val) => (password = val)"
      @update:fullName="(val) => (fullName = val)"
      @update:department="(val) => (department = val)"
      @update:role="(val) => (role = val)"
      @update:rememberMe="(val) => (rememberMe = val)"
      @update:termsAccepted="(val) => (termsAccepted = val)"
      @update:showPassword="(val) => (showPassword = val)"
      @submit="handleSubmit"
      @forgotPassword="handleForgotPassword"
    />
  </AuthContainer>
</template>
