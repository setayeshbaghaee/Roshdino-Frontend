import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../components/Dashboard/dashboard.css";

import ProfileSection from "../components/Dashboard/ProfileSection";
import StatsCard from "../components/Dashboard/StatsCard";
import CourseCard from "../components/Dashboard/CourseCard";
import AddCourseCard from "../components/Dashboard/AddCourseCard";
import CourseModal from "../components/Dashboard/CourseModal";

import { fetchSkills } from "../api/skills";
import { getMe } from "../api/accounts";
import { deleteCourse, getMyCourses } from "../api/courses";


const normalizeCourse = (item) => ({
  ...item,
  course_title:
    item?.course_title || item?.title || item?.course?.title || "دوره",
  url:
    item?.url ||
    item?.course_url ||
    item?.course?.url ||
    item?.resource?.url ||
    null,
  image_url:
    item?.image_url ||
    item?.course_image_url ||
    item?.course?.image_url ||
    null,
  steps: item?.steps || item?.course?.steps || [],
});

const Dashboard = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [skills, setSkills] = useState([]);
  const [membershipDays, setMembershipDays] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [coursesData, skillsData, userData] = await Promise.all([
        getMyCourses(),
        fetchSkills(),
        getMe(),
      ]);

      const rawCourses = Array.isArray(coursesData)
        ? coursesData
        : coursesData?.results || [];

      setCourses(rawCourses.map(normalizeCourse));
      setSkills(Array.isArray(skillsData) ? skillsData : skillsData?.results || []);
    } catch (err) {
      console.error("DASHBOARD FETCH ERROR:", err);
      setError("خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const skillsMap = useMemo(() => {
    const map = {};

    skills.forEach((skill) => {
      map[skill.name?.toLowerCase()] = skill.image_url;
    });

    return map;
  }, [skills]);

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);

      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== id)
      );

      setSelectedCourse((current) =>
        current?.id === id ? null : current
      );
    } catch (err) {
      console.error("DELETE COURSE ERROR:", err);
      alert("خطا در حذف دوره");
    }
  };

  const handleCourseUpdate = (updatedCourse) => {
    const mergeCourse = (oldCourse) =>
      normalizeCourse({
        ...oldCourse,
        ...updatedCourse,
        url:
          updatedCourse?.url ||
          updatedCourse?.course_url ||
          updatedCourse?.course?.url ||
          oldCourse?.url,
        image_url:
          updatedCourse?.image_url ||
          updatedCourse?.course_image_url ||
          updatedCourse?.course?.image_url ||
          oldCourse?.image_url,
        steps: updatedCourse?.steps || oldCourse?.steps || [],
      });

    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === updatedCourse.id ? mergeCourse(course) : course
      )
    );

    setSelectedCourse((current) =>
      current?.id === updatedCourse.id ? mergeCourse(current) : current
    );
  };

  const isCourseCompleted = (course) =>
    course?.status?.toLowerCase() === "completed" ||
    Number(course?.progress_percentage) >= 100;

  const completedCourseItems = courses.filter(isCourseCompleted);

  const learningCourses = courses.filter(
    (course) => !isCourseCompleted(course)
  );

  const completedCourses = completedCourseItems.length;

  return (
    <div className="dashboard-page">
      <ProfileSection />

      <div className="dashboard-content">
        <div className="dashboard-right">
          <div className="stats-section">
            <h2>آمار کلی</h2>

            <div className="stats-grid">
              <StatsCard number={completedCourses} title="تکمیل شده" />
              <StatsCard number={learningCourses.length} title="در حال یادگیری" />
            </div>
          </div>

          <div className="courses-section">
            {loading && <p>لودینگ...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && (
              <>
                <div className="course-list-section">
                  <h2>دوره‌های در حال یادگیری</h2>

                  <div className="courses-grid">
                    {learningCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        id={course.id}
                        title={course.course_title}
                        progress={course.progress_percentage ?? 0}
                        imageUrl={course.image_url}
                        onDelete={handleDelete}
                        onOpen={() => setSelectedCourse(course)}
                      />
                    ))}

                    <AddCourseCard addCourse={() => navigate("/add_course")} />
                  </div>
                </div>

                <div className="course-list-section completed-courses-section">
                  <h2>دوره‌های تکمیل‌شده</h2>

                  {completedCourseItems.length > 0 ? (
                    <div className="courses-grid">
                      {completedCourseItems.map((course) => (
                        <CourseCard
                          key={course.id}
                          id={course.id}
                          title={course.course_title}
                          progress={course.progress_percentage ?? 100}
                          imageUrl={course.image_url}
                          onDelete={handleDelete}
                          onOpen={() => setSelectedCourse(course)}
                        />
                      ))}
                    </div>
                  ) : (
                    <p>هنوز دوره‌ای تکمیل نشده است.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onUpdate={handleCourseUpdate}
      />
    </div>
  );
};

export default Dashboard;