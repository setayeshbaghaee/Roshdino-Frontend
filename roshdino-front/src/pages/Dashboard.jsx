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

import {
  getMyCourses,
  deleteCourse,
} from "../api/courses";

/* ================= helpers ================= */
const calculateMembershipDays = (createdAt) => {
  if (!createdAt) return 0;

  const today = new Date();
  const startDate = new Date(createdAt);

  if (Number.isNaN(startDate.getTime())) return 0;

  return Math.floor(
    (today - startDate) / (1000 * 60 * 60 * 24)
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [skills, setSkills] = useState([]);
  const [membershipDays, setMembershipDays] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  /* ================= fetch data ================= */
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [coursesData, skillsData, userData] = await Promise.all([
        getMyCourses(),
        fetchSkills(),
        getMe(),
      ]);

      setCourses(coursesData || []);
      setSkills(skillsData || []);

      setMembershipDays(
        calculateMembershipDays(userData?.created_at)
      );
    } catch (err) {
      console.log(err);
      setError("خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= skills map ================= */
  const skillsMap = useMemo(() => {
    const map = {};

    skills.forEach((skill) => {
      map[skill.name?.toLowerCase()] = skill.image_url;
    });

    return map;
  }, [skills]);

  const getSkillIcon = (name) => {
    return skillsMap[name?.toLowerCase()] || null;
  };

  /* ================= delete course ================= */
  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);

      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== id)
      );

      if (selectedCourse?.id === id) {
        setSelectedCourse(null);
      }
    } catch (err) {
      console.log(err);
      alert("خطا در حذف دوره");
    }
  };

  /* ================= update course after modal change ================= */
  const handleCourseUpdate = (updatedCourse) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );

    setSelectedCourse(updatedCourse);
  };

  const completedCourses = courses.filter(
    (course) =>
      course.status === "completed" ||
      course.progress_percentage === 100
  ).length;

  return (
    <div className="dashboard-page">
      <ProfileSection />

      <div className="dashboard-content">
        <div className="dashboard-right">
          {/* ================= STATS ================= */}
          <div className="stats-section">
            <h2>آمار کلی</h2>

            <div className="stats-grid">
              <StatsCard
                number={completedCourses}
                title="تکمیل شده"
              />

              <StatsCard
                number={courses.length}
                title="در حال یادگیری"
              />

              <StatsCard
                number={membershipDays}
                title="روز عضویت"
              />
            </div>
          </div>

          <div className="courses-section">
            <h2>دوره ها</h2>

            {loading && <p>لودینگ...</p>}
            {error && <p>{error}</p>}

            <div className="courses-grid">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.course_title}
                  progress={course.progress_percentage}
                  skillIcon={getSkillIcon(course.skill_name)}
                  onDelete={handleDelete}
                  onOpen={() => setSelectedCourse(course)}
                />
              ))}

              <AddCourseCard
                addCourse={() => navigate("/add_course")}
              />
            </div>
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