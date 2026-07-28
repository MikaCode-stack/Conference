<script setup>
import { ref, onMounted } from 'vue'
import {
  getSessions,
  createSession,
  updateSession,
  deleteSession,
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../api.js'

const sessions = ref([])
const announcements = ref([])

const newSession = ref({ day: '', time: '', title: '', speaker: '', location: '', tag: '' })
const newAnnouncement = ref({ variant: 'live', message: '', visible: false })

async function loadSessions() {
  sessions.value = await getSessions()
}

async function loadAnnouncements() {
  announcements.value = await getAnnouncements()
}

onMounted(() => {
  loadSessions()
  loadAnnouncements()
})

async function addSession() {
  await createSession(newSession.value)
  newSession.value = { day: '', time: '', title: '', speaker: '', location: '', tag: '' }
  await loadSessions()
}

async function saveSession(session) {
  await updateSession(session._id, {
    day: session.day,
    time: session.time,
    title: session.title,
    speaker: session.speaker,
    location: session.location,
    tag: session.tag,
  })
  await loadSessions()
}

async function removeSession(id) {
  await deleteSession(id)
  await loadSessions()
}

async function addAnnouncement() {
  await createAnnouncement(newAnnouncement.value)
  newAnnouncement.value = { variant: 'live', message: '', visible: false }
  await loadAnnouncements()
}

async function saveAnnouncement(announcement) {
  await updateAnnouncement(announcement._id, {
    variant: announcement.variant,
    message: announcement.message,
    visible: announcement.visible,
  })
  await loadAnnouncements()
}

async function removeAnnouncement(id) {
  await deleteAnnouncement(id)
  await loadAnnouncements()
}
</script>

<template>
  <div class="px-5 py-8 text-left">
    <h1 class="mb-8 font-heading text-3xl font-medium text-red-700 dark:text-red-400">Admin</h1>

    <section class="mb-10" aria-labelledby="sessions-heading">
      <h2 id="sessions-heading" class="mb-2 font-heading text-2xl font-medium text-red-700 dark:text-red-400">
        Sessions
      </h2>

      <form class="mb-4 flex flex-wrap gap-2" @submit.prevent="addSession">
        <input
          v-model="newSession.day"
          type="date"
          required
          class="rounded border border-gray-200 px-2 py-1 text-sm dark:border-gray-800 dark:bg-gray-900"
        />
        <input
          v-model="newSession.time"
          placeholder="Time (e.g. 09:00)"
          required
          class="rounded border border-gray-200 px-2 py-1 text-sm dark:border-gray-800 dark:bg-gray-900"
        />
        <input
          v-model="newSession.title"
          placeholder="Title"
          required
          class="rounded border border-gray-200 px-2 py-1 text-sm dark:border-gray-800 dark:bg-gray-900"
        />
        <input
          v-model="newSession.speaker"
          placeholder="Speaker"
          class="rounded border border-gray-200 px-2 py-1 text-sm dark:border-gray-800 dark:bg-gray-900"
        />
        <input
          v-model="newSession.location"
          placeholder="Location"
          class="rounded border border-gray-200 px-2 py-1 text-sm dark:border-gray-800 dark:bg-gray-900"
        />
        <input
          v-model="newSession.tag"
          placeholder="Tag"
          class="rounded border border-gray-200 px-2 py-1 text-sm dark:border-gray-800 dark:bg-gray-900"
        />
        <button
          type="submit"
          class="rounded bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
        >
          Add session
        </button>
      </form>

      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th
              class="border-b border-gray-200 p-2 text-left font-medium text-red-700 dark:border-gray-800 dark:text-red-400"
            >
              Day
            </th>
            <th
              class="border-b border-gray-200 p-2 text-left font-medium text-red-700 dark:border-gray-800 dark:text-red-400"
            >
              Time
            </th>
            <th
              class="border-b border-gray-200 p-2 text-left font-medium text-red-700 dark:border-gray-800 dark:text-red-400"
            >
              Title
            </th>
            <th
              class="border-b border-gray-200 p-2 text-left font-medium text-red-700 dark:border-gray-800 dark:text-red-400"
            >
              Speaker
            </th>
            <th
              class="border-b border-gray-200 p-2 text-left font-medium text-red-700 dark:border-gray-800 dark:text-red-400"
            >
              Location
            </th>
            <th
              class="border-b border-gray-200 p-2 text-left font-medium text-red-700 dark:border-gray-800 dark:text-red-400"
            >
              Tag
            </th>
            <th class="border-b border-gray-200 p-2 text-left dark:border-gray-800"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="session in sessions" :key="session._id">
            <td class="border-b border-gray-200 p-2 dark:border-gray-800">
              <input
                v-model="session.day"
                type="date"
                class="w-full rounded border border-gray-200 px-2 py-1 text-sm dark:border-gray-800 dark:bg-gray-900"
              />
            </td>
            <td class="border-b border-gray-200 p-2 dark:border-gray-800">
              <input
                v-model="session.time"
                class="w-full rounded border border-gray-200 px-2 py-1 text-sm dark:border-gray-800 dark:bg-gray-900"
              />
            </td>
            <td class="border-b border-gray-200 p-2 dark:border-gray-800">
              <input
                v-model="session.title"
                class="w-full rounded border border-gray-200 px-2 py-1 text-sm dark:border-gray-800 dark:bg-gray-900"
              />
            </td>
            <td class="border-b border-gray-200 p-2 dark:border-gray-800">
              <input
                v-model="session.speaker"
                class="w-full rounded border border-gray-200 px-2 py-1 text-sm dark:border-gray-800 dark:bg-gray-900"
              />
            </td>
            <td class="border-b border-gray-200 p-2 dark:border-gray-800">
              <input
                v-model="session.location"
                class="w-full rounded border border-gray-200 px-2 py-1 text-sm dark:border-gray-800 dark:bg-gray-900"
              />
            </td>
            <td class="border-b border-gray-200 p-2 dark:border-gray-800">
              <input
                v-model="session.tag"
                class="w-full rounded border border-gray-200 px-2 py-1 text-sm dark:border-gray-800 dark:bg-gray-900"
              />
            </td>
            <td class="border-b border-gray-200 p-2 whitespace-nowrap dark:border-gray-800">
              <button
                type="button"
                class="mr-2 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
                @click="saveSession(session)"
              >
                Save
              </button>
              <button
                type="button"
                class="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-950 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                @click="removeSession(session._id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section aria-labelledby="announcements-heading">
      <h2
        id="announcements-heading"
        class="mb-2 font-heading text-2xl font-medium text-red-700 dark:text-red-400"
      >
        Announcements
      </h2>

      <form class="mb-4 flex flex-wrap items-center gap-2" @submit.prevent="addAnnouncement">
        <select
          v-model="newAnnouncement.variant"
          class="rounded border border-gray-200 px-2 py-1 text-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <option value="live">Live</option>
          <option value="reminder">Reminder</option>
        </select>
        <input
          v-model="newAnnouncement.message"
          placeholder="Message"
          required
          class="min-w-64 flex-1 rounded border border-gray-200 px-2 py-1 text-sm dark:border-gray-800 dark:bg-gray-900"
        />
        <label class="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
          <input v-model="newAnnouncement.visible" type="checkbox" /> Visible
        </label>
        <button
          type="submit"
          class="rounded bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
        >
          Add announcement
        </button>
      </form>

      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th
              class="border-b border-gray-200 p-2 text-left font-medium text-red-700 dark:border-gray-800 dark:text-red-400"
            >
              Variant
            </th>
            <th
              class="border-b border-gray-200 p-2 text-left font-medium text-red-700 dark:border-gray-800 dark:text-red-400"
            >
              Message
            </th>
            <th
              class="border-b border-gray-200 p-2 text-left font-medium text-red-700 dark:border-gray-800 dark:text-red-400"
            >
              Visible
            </th>
            <th class="border-b border-gray-200 p-2 text-left dark:border-gray-800"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="announcement in announcements" :key="announcement._id">
            <td class="border-b border-gray-200 p-2 dark:border-gray-800">
              <select
                v-model="announcement.variant"
                class="rounded border border-gray-200 px-2 py-1 text-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <option value="live">Live</option>
                <option value="reminder">Reminder</option>
              </select>
            </td>
            <td class="border-b border-gray-200 p-2 dark:border-gray-800">
              <input
                v-model="announcement.message"
                class="w-full rounded border border-gray-200 px-2 py-1 text-sm dark:border-gray-800 dark:bg-gray-900"
              />
            </td>
            <td class="border-b border-gray-200 p-2 dark:border-gray-800">
              <input v-model="announcement.visible" type="checkbox" />
            </td>
            <td class="border-b border-gray-200 p-2 whitespace-nowrap dark:border-gray-800">
              <button
                type="button"
                class="mr-2 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
                @click="saveAnnouncement(announcement)"
              >
                Save
              </button>
              <button
                type="button"
                class="rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-950 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                @click="removeAnnouncement(announcement._id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
