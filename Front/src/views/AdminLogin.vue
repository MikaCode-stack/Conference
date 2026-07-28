<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../api.js'

const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const isLoading = ref(false)
const errorMessage = ref('')

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

async function handleLogin() {
  errorMessage.value = ''

  if (!form.email || !form.password) {
    errorMessage.value = 'Please fill in all fields.'
    return
  }

  if (!isValidEmail(form.email)) {
    errorMessage.value = 'Please enter a valid email address.'
    return
  }

  try {
    isLoading.value = true
    const { token } = await login(form.email, form.password)
    localStorage.setItem('admin_token', token)
    router.push({ name: 'AdminDashboard' })
  } catch {
    errorMessage.value = 'Invalid admin credentials.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-5">
    <div class="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-900">
      <div class="mb-6 text-center">
        <h2 class="font-heading text-2xl font-medium text-violet-700 dark:text-violet-400">
          Admin Portal
        </h2>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">Sign in to access your dashboard</p>
      </div>

      <div
        v-if="errorMessage"
        class="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400"
      >
        {{ errorMessage }}
      </div>

      <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
        <div class="flex flex-col gap-1">
          <label for="email" class="text-sm font-medium text-gray-600 dark:text-gray-400"
            >Email address</label
          >
          <input
            id="email"
            v-model.trim="form.email"
            type="email"
            placeholder="admin@example.com"
            :disabled="isLoading"
            autocomplete="username"
            class="rounded border border-gray-200 px-3 py-2 text-sm disabled:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:disabled:bg-gray-800"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="password" class="text-sm font-medium text-gray-600 dark:text-gray-400"
            >Password</label
          >
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            :disabled="isLoading"
            autocomplete="current-password"
            class="rounded border border-gray-200 px-3 py-2 text-sm disabled:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:disabled:bg-gray-800"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="mt-2 rounded bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-60 dark:bg-violet-500 dark:hover:bg-violet-400"
        >
          {{ isLoading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>
    </div>
  </div>
</template>
