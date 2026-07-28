const API_BASE = '/api'

async function request(path, options) {
  const token = localStorage.getItem('admin_token')
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })
  if (!res.ok) {
    if (res.status === 401) localStorage.removeItem('admin_token')
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed: ${res.status}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export const login = (email, password) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })

export const getSessions = () => request('/sessions')
export const createSession = (session) =>
  request('/sessions', { method: 'POST', body: JSON.stringify(session) })
export const updateSession = (id, updates) =>
  request(`/sessions/${id}`, { method: 'PUT', body: JSON.stringify(updates) })
export const deleteSession = (id) => request(`/sessions/${id}`, { method: 'DELETE' })

export const getAnnouncements = () => request('/announcements')
export const createAnnouncement = (announcement) =>
  request('/announcements', { method: 'POST', body: JSON.stringify(announcement) })
export const updateAnnouncement = (id, updates) =>
  request(`/announcements/${id}`, { method: 'PUT', body: JSON.stringify(updates) })
export const deleteAnnouncement = (id) => request(`/announcements/${id}`, { method: 'DELETE' })
