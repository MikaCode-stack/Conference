import { createRouter, createWebHistory } from 'vue-router'
import AgendaPage from './views/AgendaPage.vue'
import AdminPage from './views/AdminPage.vue'
import AdminLogin from './views/AdminLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Agenda', component: AgendaPage },
    { path: '/admin/login', name: 'AdminLogin', component: AdminLogin },
    { path: '/admin', name: 'AdminDashboard', component: AdminPage, meta: { requiresAuth: true } },
  ],
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !localStorage.getItem('admin_token')) {
    return { name: 'AdminLogin' }
  }
})

export default router
