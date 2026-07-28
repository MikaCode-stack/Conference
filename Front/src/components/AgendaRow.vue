<script setup>
import { computed } from 'vue'
import { getTagStyle } from '../tagStyles.js'

const props = defineProps({
  session: { type: Object, required: true },
  status: { type: String, default: 'upcoming' },
})

const tagStyle = computed(() => getTagStyle(props.session.tag))
</script>

<template>
  <li class="flex gap-3" :class="{ 'opacity-60': status === 'ended' }">
    <div
      class="flex w-24 shrink-0 items-center justify-center rounded-2xl px-3 py-4 text-lg font-bold text-white"
      :class="tagStyle.badge"
    >
      {{ session.time }}
    </div>
    <div
      class="flex flex-1 flex-wrap items-center justify-between gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-gray-900"
    >
      <div>
        <p class="font-medium text-gray-950 dark:text-gray-100">{{ session.title }}</p>
        <div class="mt-1 flex flex-wrap items-center gap-2 text-xs">
          <span
            v-if="status === 'live'"
            class="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 font-semibold text-red-700 dark:bg-red-500/20 dark:text-red-300"
          >
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500"></span>
            Live now
          </span>
          <span
            v-else-if="status === 'starting-soon'"
            class="rounded-full bg-amber-100 px-2 py-0.5 font-semibold text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
          >
            Starting soon
          </span>
          <span
            v-else-if="status === 'ended'"
            class="rounded-full bg-gray-100 px-2 py-0.5 font-semibold text-gray-500 dark:bg-gray-800 dark:text-gray-500"
          >
            Ended
          </span>
          <span v-if="session.tag" class="rounded-full px-2 py-0.5 font-semibold" :class="tagStyle.pill">
            {{ session.tag }}
          </span>
          <span v-if="session.speaker" class="text-gray-500 dark:text-gray-400">{{
            session.speaker
          }}</span>
        </div>
      </div>
      <span v-if="session.location" class="text-xs text-gray-500 dark:text-gray-400">{{
        session.location
      }}</span>
    </div>
  </li>
</template>
