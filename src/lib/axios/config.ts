import axios from 'axios'

export const createAxios = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('jwt')
      if (token) {
        config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
}
