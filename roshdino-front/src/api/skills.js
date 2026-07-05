import { api } from "./client";

export const fetchSkills = async () => {
  const res = await api.get("skills/");
  return res.data;
};

export const fetchSubSkillsBySkill = async (skillId) => {
  const skills = await fetchSkills();

  const selectedSkill = skills.find(
    (skill) => skill.id === skillId
  );

  return selectedSkill?.subskills || [];
};

