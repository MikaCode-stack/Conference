<script setup>
import { computed, ref, watch } from 'vue'
import AgendaRow from './AgendaRow.vue'
import { getSessionStatus } from '../sessionStatus.js'

const props = defineProps({
  sessions: { type: Array, default: () => [] },
})

const days = computed(() => [...new Set(props.sessions.map((s) => s.day).filter(Boolean))].sort())

const activeDay = ref('')

watch(
  days,
  (newDays) => {
    if (newDays.length && !newDays.includes(activeDay.value)) {
      const today = new Date().toISOString().slice(0, 10)
      activeDay.value = newDays.includes(today) ? today : newDays[0]
    }
  },
  { immediate: true },
)

const sessionsForActiveDay = computed(() =>
  props.sessions
    .filter((s) => s.day === activeDay.value)
    .sort((a, b) => a.time.localeCompare(b.time)),
)

function statusFor(index) {
  return getSessionStatus(sessionsForActiveDay.value[index], sessionsForActiveDay.value[index + 1])
}

function formatDayLabel(day) {
  const date = new Date(`${day}T00:00:00`)
  return {
    weekday: date.toLocaleDateString(undefined, { weekday: 'long' }),
    dateStr: date.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' }),
  }
}

const progress = computed(() => {
  const list = sessionsForActiveDay.value
  if (!list.length) return 0
  const now = new Date()
  const started = list.filter((s) => new Date(`${s.day}T${s.time}`) <= now).length
  return Math.round((started / list.length) * 100)
})
</script>

<template>
  <section class="px-5 py-8" aria-labelledby="agenda-heading">
    <h2
      id="agenda-heading"
      class="mb-4 font-heading text-2xl font-medium text-red-700 dark:text-red-400"
    >
      Schedule
    </h2>

    <div v-if="days.length" class="mb-6 flex gap-3 overflow-x-auto pb-1">
      <button
        v-for="day in days"
        :key="day"
        type="button"
        class="shrink-0 basis-32 rounded-xl px-4 py-3 text-center transition sm:flex-1"
        :class="
          day === activeDay
            ? 'bg-red-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
        "
        @click="activeDay = day"
      >
        <span class="block font-heading font-semibold">{{ formatDayLabel(day).weekday }}</span>
        <span class="block text-sm opacity-80">{{ formatDayLabel(day).dateStr }}</span>
      </button>
    </div>

    <template v-if="sessionsForActiveDay.length">
      <div class="mb-2 flex items-center justify-between text-sm">
        <span class="text-gray-500 dark:text-gray-400">Progress</span>
        <span class="font-semibold text-green-600 dark:text-green-400">{{ progress }}%</span>
      </div>
      <div class="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
        <div
          class="h-full rounded-full bg-green-500 transition-all"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </template>

    <div class="max-h-[65vh] overflow-y-auto pr-1">
      <ul class="flex flex-col gap-3">
        <AgendaRow
          v-for="(session, index) in sessionsForActiveDay"
          :key="session._id"
          :session="session"
          :status="statusFor(index)"
        />
      </ul>
    </div>
  </section>
</template>
