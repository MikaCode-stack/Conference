<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()

const isDark = ref(false)
const isAuthed = ref(!!localStorage.getItem('admin_token'))

function applyTheme(dark) {
  document.documentElement.classList.toggle('dark', dark)
}

onMounted(() => {
  const stored = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = stored ? stored === 'dark' : prefersDark
  applyTheme(isDark.value)
})

router.afterEach(() => {
  isAuthed.value = !!localStorage.getItem('admin_token')
})

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyTheme(isDark.value)
}

function logout() {
  localStorage.removeItem('admin_token')
  isAuthed.value = false
  router.push({ name: 'AdminLogin' })
}
</script>

<template>
  <nav
    class="flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-3 dark:border-gray-800"
  >
    <div class="flex gap-4">
      <RouterLink
        to="/"
        class="font-medium text-primary hover:text-secondary dark:text-primary dark:hover:text-secondary"
      >
        Agenda
      </RouterLink>
      <RouterLink
        to="/admin"
        class="font-medium text-primary hover:text-secondary dark:text-primary dark:hover:text-secondary"
      >
        Admin
      </RouterLink>
    </div>
    <div class="flex items-center gap-3">
      <button
        v-if="isAuthed"
        type="button"
        class="rounded border border-gray-200 px-2 py-1 text-sm text-gray-600 hover:text-gray-950 dark:border-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
        @click="logout"
      >
        Log out
      </button>
      <button
        type="button"
        class="rounded border border-gray-200 px-2 py-1 text-sm text-gray-600 hover:text-gray-950 dark:border-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
        @click="toggleTheme"
      >
        {{ isDark ? 'Light mode' : 'Dark mode' }}
      </button>
    </div>
  </nav>
  <RouterView />
</template>
