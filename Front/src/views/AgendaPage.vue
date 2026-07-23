<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import AlertBanner from '../components/AlertBanner.vue'
import AgendaSection from '../components/AgendaSection.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { getSessions, getAnnouncements } from '../api.js'

const REFRESH_INTERVAL_MS = 5000

const conference = {
  name: 'DevConnect 2026',
  tagline: 'Where builders meet the future of software.',
  dates: 'August 12–13, 2026',
  location: 'Lagos, Nigeria',
}

const liveAnnouncement = ref({ visible: false, message: '' })
const reminder = ref({ visible: false, message: '' })
const sessions = ref([])

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
    const live = announcements.find((a) => a.variant === 'live')
    const rem = announcements.find((a) => a.variant === 'reminder')
    liveAnnouncement.value = live
      ? { visible: live.visible, message: live.message }
      : { visible: false, message: '' }
    reminder.value = rem
      ? { visible: rem.visible, message: rem.message }
      : { visible: false, message: '' }
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
      :visible="liveAnnouncement.visible"
      :message="liveAnnouncement.message"
      @dismiss="liveAnnouncement.visible = false"
    />
    <AlertBanner
      variant="reminder"
      :visible="reminder.visible"
      :message="reminder.message"
      @dismiss="reminder.visible = false"
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
