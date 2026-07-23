<script setup>
defineProps({
  name: { type: String, default: '' },
})

const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 px-5 py-6 dark:border-gray-800"
  >
    <p class="text-sm text-gray-600 dark:text-gray-400">&copy; {{ year }} {{ name }}</p>
    <nav class="flex gap-4 text-sm text-gray-600 dark:text-gray-400" aria-label="Footer">
      <a href="#" class="hover:text-gray-950 dark:hover:text-gray-100">Contact</a>
      <a href="#" class="hover:text-gray-950 dark:hover:text-gray-100">Code of Conduct</a>
      <a href="#" class="hover:text-gray-950 dark:hover:text-gray-100">Privacy</a>
    </nav>
  </footer>
</template>
