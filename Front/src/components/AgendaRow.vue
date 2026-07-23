<script setup>
defineProps({
  session: { type: Object, required: true },
})
</script>

<template>
  <div
    class="grid grid-cols-[100px_1fr_1fr_1fr] gap-3 border-b border-gray-200 py-3 text-left dark:border-gray-800"
    role="row"
  >
    <span class="text-sm text-gray-600 dark:text-gray-400" role="cell">{{ session.time }}</span>
    <div role="cell">
      <p class="text-sm font-medium text-gray-950 dark:text-gray-100">{{ session.title }}</p>
      <span v-if="session.tag" class="text-xs text-violet-600 dark:text-violet-400">{{
        session.tag
      }}</span>
    </div>
    <span class="text-sm text-gray-600 dark:text-gray-400" role="cell">{{ session.speaker }}</span>
    <span class="text-sm text-gray-600 dark:text-gray-400" role="cell">{{
      session.location
    }}</span>
  </div>
</template>
