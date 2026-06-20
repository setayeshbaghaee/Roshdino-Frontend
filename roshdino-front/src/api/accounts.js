import { api } from "./client";

// گرفتن پروفایل
export const getMe = async () => {
  const res = await api.get("/accounts/me/");
  return res.data;
};

// آپدیت پروفایل (بدون avatar)
export const updateMe = async (data) => {
  const res = await api.patch("/accounts/me/", data);
  return res.data;
};

export const handleLogout = async () => {
  try {
    const refresh = localStorage.getItem("refresh_token");

    if (refresh) {
      await api.post("/accounts/logout/", {
        refresh: refresh,
      });
    }

  } catch (err) {
    console.log("logout error:", err);
  } finally {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};