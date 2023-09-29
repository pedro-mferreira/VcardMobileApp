import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue'
import RegisterForm from '../components/Register/RegisterForm.vue';
import Tabs from '../components/Tabs.vue'
import LoginPage from '../components/LoginPage/LoginPage.vue'

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'LoginPage',
        component: LoginPage
      },
      {
        path: '/register',
        name: 'Register',
        component: RegisterForm
      },
    ]
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/dashboard'
      },
      {
        path: 'dashboard/:id',
        name: 'Dashboard',
        component: () => import('@/components/Dashboard/Dashboard.vue'),
        props: route => ({ id: parseInt(route.params.id) })
      },
      {
        path: 'transactions/:id',
        name: 'Transactions',
        component: () => import('@/components/Dashboard/Transactions.vue'),
        props: route => ({ id: parseInt(route.params.id) })
      },
      {
        path: 'transaction/:id',
        name: 'MakeTransaction',
        component: () => import('@/components/Dashboard/MakeTransaction.vue'),
        props: route => ({ id: parseInt(route.params.id) })
      },
      {
        path: 'piggybank/:id',
        name: 'PiggyBank',
        component: () => import('@/components/Dashboard/PiggyBank.vue'),
        props: route => ({ id: parseInt(route.params.id) })
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
