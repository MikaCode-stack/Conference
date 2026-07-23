<script setup>
import AgendaRow from './AgendaRow.vue'

defineProps({
  sessions: { type: Array, default: () => [] },
})
</script>

<template>
  <section class="px-5 py-8" aria-labelledby="agenda-heading">
    <h2 id="agenda-heading" class="mb-2 font-heading text-2xl font-medium text-violet-700 dark:text-violet-400">
      Schedule
    </h2>

    <div
      class="grid border-t border-gray-200 dark:border-gray-800"
      role="table"
      aria-label="Conference schedule"
    >
      <div
        class="grid grid-cols-[100px_1fr_1fr_1fr] gap-3 border-b border-gray-200 py-3 text-left text-sm font-medium text-violet-700 dark:border-gray-800 dark:text-violet-400"
        role="row"
      >
        <span role="columnheader">Time</span>
        <span role="columnheader">Session</span>
        <span role="columnheader">Speaker</span>
        <span role="columnheader">Location</span>
      </div>

      <AgendaRow v-for="session in sessions" :key="session._id" :session="session" />
    </div>
  </section>
</template>
