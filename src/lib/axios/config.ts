import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem('auth-storage')

    const authParsed = auth ? JSON.parse(auth) : null

    const token = authParsed && authParsed?.state.user ? authParsed.state.user.token : null

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
