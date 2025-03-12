import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import api from './services/api'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Try to fetch CSRF token but mount the app regardless of outcome
api.fetchCSRFToken()
  .catch(error => {
    console.error('Failed to fetch CSRF token, but continuing app initialization:', error)
  })
  .finally(() => {
    // Always mount the app, even if CSRF token fetch fails
    app.mount('#app')
  })
