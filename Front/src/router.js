import { createRouter, createWebHistory } from 'vue-router'
import AgendaPage from './views/AgendaPage.vue'
import AdminPage from './views/AdminPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: AgendaPage },
    { path: '/admin', component: AdminPage },
  ],
})

export default router
