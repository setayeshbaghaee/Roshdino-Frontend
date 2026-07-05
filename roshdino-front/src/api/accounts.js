import { api } from "./client"

export const getProfile = async () => {
  const response = await api.get("/profile/")
  return response.data
}

export const updateProfile = async (data) => {
  const response = await api.patch("/accounts/me/", data)
  return response.data
}

export const uploadProfileAvatar = async (file) => {
  if (!file) {
    throw new Error("avatar file is required")
  }

  const formData = new FormData()
  formData.append("avatar", file)

  const response = await api.patch("/profile/", formData, {
    timeout: 60000,
  })

  return response.data
}
export const deleteProfileAvatar = async () => {
  const response = await api.delete("/profile/")
  return response.data
}

export const getMe = getProfile
export const updateMe = updateProfile

export const handleLogout = async () => {
  try {
    const refresh = localStorage.getItem("refresh_token")

    if (refresh) {
      await api.post("/accounts/logout/", {
        refresh,
      })
    }
  } catch (err) {
    console.log("logout error:", err)
  } finally {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
  }
}