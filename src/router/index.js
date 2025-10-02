import { createRouter, createWebHistory } from 'vue-router'
import { inject } from 'vue'
import HomeView from '../views/HomeView.vue'
import OfferView from '../views/OfferView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import Publish from '@/views/Publish.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: (route) => ({
        title: route.query.title || '',
        page: parseInt(route.query.page) || 1,
        priceMin: parseInt(route.query.priceMin) || 1,
        priceMax: parseInt(route.query.priceMax) || 100000,
      }),
    },
    {
      path: '/offer/:id',
      name: 'offer',
      component: OfferView,
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish,
      meta: { requiredAuth: true },
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
})

router.beforeEach((to, from) => {
  const GlobalStore = inject('GlobalStore')

  if (to.meta.requiredAuth && !GlobalStore.userInfos.value) {
    return { name: 'login', query: { redirect: to.name } }
  }
})

export default router
