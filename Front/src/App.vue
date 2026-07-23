<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const isDark = ref(false)

function applyTheme(dark) {
  document.documentElement.classList.toggle('dark', dark)
}

onMounted(() => {
  const stored = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = stored ? stored === 'dark' : prefersDark
  applyTheme(isDark.value)
})

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyTheme(isDark.value)
}
</script>

<template>
  <nav
    class="flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-3 dark:border-gray-800"
  >
    <div class="flex gap-4">
      <RouterLink
        to="/"
        class="font-medium text-violet-700 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300"
      >
        Agenda
      </RouterLink>
      <RouterLink
        to="/admin"
        class="font-medium text-violet-700 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300"
      >
        Admin
      </RouterLink>
    </div>
    <button
      type="button"
      class="rounded border border-gray-200 px-2 py-1 text-sm text-gray-600 hover:text-gray-950 dark:border-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
      @click="toggleTheme"
    >
      {{ isDark ? 'Light mode' : 'Dark mode' }}
    </button>
  </nav>
  <RouterView />
</template>
