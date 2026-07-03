import { api } from "./client";

/* my courses */
export const getMyCourses = async () => {
  const res = await api.get("my-courses/");
  return res.data;
};

/* add course */
export const addCourse = async (courseId) => {
  const res = await api.post("add-course/", {
    course_id: courseId,
  });

  return res.data;
};

/* ⭐ FIX اصلی اینجاست */
export const updateCourseStep = async (userCourseId, stepId, isDone) => {
  const res = await api.patch(`my-courses/${userCourseId}/`, {
    step_id: stepId,
    is_done: isDone,
  });

  return res.data;
};

/* delete */
export const deleteCourse = async (id) => {
  const res = await api.delete(`my-courses/${id}/`);
  return res.data;
};

/* recommend */
export const recommendCourse = async (payload) => {
  const res = await api.post("recommend-course/", payload);
  return res.data;
};