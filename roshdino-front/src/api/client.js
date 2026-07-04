import axios from "axios"

const API_BASE_URL = "https://roshdino.chbkn.run/api"

export const api = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15000,
})


/* =========================
   REQUEST INTERCEPTOR
========================= */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)


/* =========================
   RESPONSE INTERCEPTOR
========================= */

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

      const refreshToken =
        localStorage.getItem("refresh_token")

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

        localStorage.setItem(
          "access_token",
          newAccessToken
        )

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`

        return api(originalRequest)

      } catch (refreshError) {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)