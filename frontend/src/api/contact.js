import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error for debugging
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', {
        status: error.response.status,
        message: error.response.data?.message,
        data: error.response.data,
      })
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request)
    } else {
      // Error in request setup
      console.error('Request Setup Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export const sendContactMessage = async (data) => {
  try {
    const response = await api.post('/contact', data)
    return response.data
  } catch (error) {
    // Re-throw with structured error
    if (error.response?.data) {
      throw {
        response: {
          status: error.response.status,
          data: error.response.data,
        },
      }
    }
    throw error
  }
}

export default api
