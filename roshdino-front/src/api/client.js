import axios from "axios"

const API_BASE_URL = "https://roshdino.chbkn.dev/api"

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem("refresh_token")

      if (!refreshToken) {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        return Promise.reject(error)
      }

      try {
        const res = await axios.post(
          `${API_BASE_URL}/accounts/token/refresh/`,
          {
            refresh: refreshToken,
          }
        )

        const newAccessToken = res.data.access
        const newRefreshToken = res.data.refresh

        localStorage.setItem("access_token", newAccessToken)

        if (newRefreshToken) {
          localStorage.setItem("refresh_token", newRefreshToken)
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return api(originalRequest)
      } catch (refreshError) {
        console.log(
          "REFRESH TOKEN ERROR:",
          refreshError?.response?.status,
          refreshError?.response?.data
        )

        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)