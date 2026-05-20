import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import login from '../views/login.vue'
import cadastro from '../views/cadastro.vue'
import entrega from '../views/entrega.vue'
import estoque from '../views/estoque.vue'
import dashboard from '../components/dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/dashboard',
    component: dashboard,
    meta: { requiresAuth: true },
    children: [
      
      { path: '', name: 'dashboard-main', component: estoque }, 
      { path: 'cadastro', name: 'cadastro', component: cadastro },
      { path: 'entrega', name: 'entrega', component: entrega },
      { path: 'estoque', name: 'estoque', component: estoque }
    ] 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router