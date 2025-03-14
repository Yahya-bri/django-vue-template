import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)

  // Actions
  async function login(username, password) {
    try {
      loading.value = true
      error.value = null
      
      // Try to fetch CSRF token first, but proceed even if it fails
      try {
        await api.fetchCSRFToken()
      } catch (csrfError) {
        console.warn('Failed to fetch CSRF token, but proceeding with login:', csrfError)
      }
      
      // Create base64 token for Basic Auth
      const credentials = btoa(`${username}:${password}`)
      localStorage.setItem('token', credentials)
      token.value = credentials
      
      // Get user information
      user.value = { username }
      
      const redirect = router.currentRoute.value.query.redirect || '/'
      router.push(redirect)
      
      return true
    } catch (err) {
      console.error('Login error:', err)
      if (err.message === 'Network Error') {
        error.value = 'Cannot connect to the server. Please check that the backend is running.'
      } else {
        error.value = err.response?.data?.detail || 'Failed to login'
      }
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    router.push('/login')
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout
  }
})
