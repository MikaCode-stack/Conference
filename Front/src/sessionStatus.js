const STARTING_SOON_MINUTES = 15
const DEFAULT_DURATION_MINUTES = 60

function toDate(day, time) {
  return new Date(`${day}T${time}`)
}

function getSessionWindow(session, nextSession) {
  const start = toDate(session.day, session.time)
  const sameDayNext = nextSession && nextSession.day === session.day ? nextSession : null
  const end = sameDayNext
    ? toDate(sameDayNext.day, sameDayNext.time)
    : new Date(start.getTime() + DEFAULT_DURATION_MINUTES * 60000)
  return { start, end }
}

export function getSessionStatus(session, nextSession, now = new Date()) {
  const { start, end } = getSessionWindow(session, nextSession)
  if (now < start) {
    const minutesUntilStart = (start - now) / 60000
    return minutesUntilStart <= STARTING_SOON_MINUTES ? 'starting-soon' : 'upcoming'
  }
  if (now < end) return 'live'
  return 'ended'
}

export function findLiveAndUpcoming(sessions, now = new Date()) {
  const sorted = [...sessions].sort((a, b) => `${a.day}T${a.time}`.localeCompare(`${b.day}T${b.time}`))
  let live = null
  let startingSoon = null
  for (let i = 0; i < sorted.length; i++) {
    const status = getSessionStatus(sorted[i], sorted[i + 1], now)
    if (status === 'live') live = sorted[i]
    if (status === 'starting-soon' && !startingSoon) startingSoon = sorted[i]
  }
  return { live, startingSoon }
}
