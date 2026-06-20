import { api } from "./client";

export const fetchSkills = async () => {
  const res = await api.get("skills/");
  return res.data;
};