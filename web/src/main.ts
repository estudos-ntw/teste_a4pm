import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/useAuthStore'

const app = createApp(App)


app.use(createPinia())
app.use(router)

if (localStorage.getItem('token')) {
  (async () => {
    const auth = useAuthStore()
    try {
      await auth.checkToken()

      auth.setIsAuth(true)
    } catch (error) {
      console.error(error)
      auth.setIsAuth(false);
    }
  })()
}

app.mount('#app')
