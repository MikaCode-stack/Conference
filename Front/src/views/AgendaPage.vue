<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import AlertBanner from '../components/AlertBanner.vue'
import AgendaSection from '../components/AgendaSection.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { getSessions, getAnnouncements } from '../api.js'
import { findLiveAndUpcoming } from '../sessionStatus.js'

const REFRESH_INTERVAL_MS = 5000

const conference = {
  name: 'IOYZSF 2026',
  tagline: 'Youth at the lead.',
  dates: '29/11 - 04/12, 2026',
  location: 'Port Louis, Mauritius',
}

const sessions = ref([])
const manualLive = ref(null)
const manualReminder = ref(null)
const dismissedLiveMessage = ref('')
const dismissedReminderMessage = ref('')

const liveBanner = computed(() => {
  if (manualLive.value) {
    return { visible: true, message: manualLive.value.message }
  }
  const { live } = findLiveAndUpcoming(sessions.value)
  if (live) {
    const message = `Live now: ${live.title}${live.location ? ` — ${live.location}` : ''}`
    if (message === dismissedLiveMessage.value) return { visible: false, message: '' }
    return { visible: true, message }
  }
  return { visible: false, message: '' }
})

const reminderBanner = computed(() => {
  if (manualReminder.value) {
    return { visible: true, message: manualReminder.value.message }
  }
  const { startingSoon } = findLiveAndUpcoming(sessions.value)
  if (startingSoon) {
    const message = `Starting soon: ${startingSoon.title} at ${startingSoon.time}`
    if (message === dismissedReminderMessage.value) return { visible: false, message: '' }
    return { visible: true, message }
  }
  return { visible: false, message: '' }
})

function dismissLive() {
  dismissedLiveMessage.value = liveBanner.value.message
}

function dismissReminder() {
  dismissedReminderMessage.value = reminderBanner.value.message
}

async function loadSessions() {
  try {
    sessions.value = await getSessions()
  } catch (err) {
    console.error('Failed to load sessions:', err)
  }
}

async function loadAnnouncements() {
  try {
    const announcements = await getAnnouncements()
    manualLive.value = announcements.find((a) => a.variant === 'live' && a.visible) || null
    manualReminder.value = announcements.find((a) => a.variant === 'reminder' && a.visible) || null
  } catch (err) {
    console.error('Failed to load announcements:', err)
  }
}

function refresh() {
  loadSessions()
  loadAnnouncements()
}

let refreshTimer

onMounted(() => {
  refresh()
  refreshTimer = setInterval(refresh, REFRESH_INTERVAL_MS)
})

onUnmounted(() => {
  clearInterval(refreshTimer)
})
</script>

<template>
  <div class="mx-auto flex min-h-screen w-full max-w-[1126px] flex-col">
    <AlertBanner
      variant="live"
      :visible="liveBanner.visible"
      :message="liveBanner.message"
      @dismiss="dismissLive"
    />
    <AlertBanner
      variant="reminder"
      :visible="reminderBanner.visible"
      :message="reminderBanner.message"
      @dismiss="dismissReminder"
    />

    <HeroSection
      :name="conference.name"
      :tagline="conference.tagline"
      :dates="conference.dates"
      :location="conference.location"
    />

    <AgendaSection :sessions="sessions" />

    <SiteFooter :name="conference.name" />
  </div>
</template>
