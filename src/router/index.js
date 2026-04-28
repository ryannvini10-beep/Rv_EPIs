import {createRouter, createWebHistory} from 'vue-router'
import home from '../views/home.vue'
import login from '../views/login.vue'
import cadastro from '../views/cadastro.vue'
import entrega from '../views/entrega.vue'
import estoque from '../views/estoque.vue'
import dashboard from '../components/dashboard.vue'
import erro from '../views/erro.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    },
{
        path: '/erro',
        name: 'erro',
        component: erro
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
      { path: 'cadastro', component: cadastro },
      { path: 'entrega', component: entrega },
      { path: 'estoque', component: estoque }

       ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router