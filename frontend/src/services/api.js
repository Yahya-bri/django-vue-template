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

// Helper function to get cookies (for CSRF token)
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Request interceptor for API calls
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Basic ${token}`
    }
    
    // Get CSRF token from cookies if it exists
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Add a function to fetch CSRF token
const fetchCSRFToken = async () => {
  try {
    // Update the path to correctly point to the backend CSRF endpoint
    // This should match the URL defined in api/urls.py
    await apiClient.get('/csrf/');
    return true;
  } catch (err) {
    console.error('Error fetching CSRF token:', err);
    return false;
  }
}

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
  },
  
  // CSRF token management
  fetchCSRFToken
}
