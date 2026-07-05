import { api } from "./client";

export const getMyCourses = async () => {
  const res = await api.get("my-courses/");
  return res.data;
};

export const addCourse = async (courseId) => {
  const res = await api.post("add-course/", {
    course_id: courseId,
  });

  return res.data;
};

export const updateCourseStep = async (userCourseId, stepId, isDone) => {
  const res = await api.patch(`my-courses/${userCourseId}/`, {
    step_id: stepId,
    is_done: isDone,
  });

  return res.data;
};

export const deleteCourse = async (id) => {
  const res = await api.delete(`my-courses/${id}/`);
  return res.data;
};

export const recommendCourse = async (payload) => {
  const res = await api.post("recommend-course/", payload);
  return res.data;
};