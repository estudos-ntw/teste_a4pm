import { useAuthStore } from '@/stores/useAuthStore'
import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: import('../components/LayoutApp.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/app/HomeView.vue'),
        },
        {
          path: 'receita/:id?',
          name: 'receita',
          component: () => import('../views/app/recipe/RecipeView.vue'),
        },

      ],
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: import('../views/LoginView.vue'),

    }, {
      path: '/register',
      name: 'register',
      component: import('../views/RegisterView.vue')
    }

  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const isAuthenticated = await auth.checkToken()
  if (to.meta?.auth) {
    if (isAuthenticated) next()
    else next({ name: 'login' })
  } else {
    if (isAuthenticated) {
      next({ name: 'home' })
    }
    next()
  }
})

export default router
