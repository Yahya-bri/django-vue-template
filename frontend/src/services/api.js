import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor for API calls
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Basic ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  // Auth endpoints
  login(credentials) {
    return apiClient.post('/api-auth/login/', credentials)
  },
  logout() {
    return apiClient.post('/api-auth/logout/')
  },

  // Items endpoints
  getItems() {
    return apiClient.get('/items/')
  },
  getItem(id) {
    return apiClient.get(`/items/${id}/`)
  },
  createItem(item) {
    return apiClient.post('/items/', item)
  },
  updateItem(id, item) {
    return apiClient.put(`/items/${id}/`, item)
  },
  deleteItem(id) {
    return apiClient.delete(`/items/${id}/`)
  }
}
