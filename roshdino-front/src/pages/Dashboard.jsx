import { useState } from "react";

import "../components/Dashboard/dashboard.css";

import ProfileSection from "../components/Dashboard/ProfileSection";
import StatsCard from "../components/Dashboard/StatsCard";
import CourseCard from "../components/Dashboard/CourseCard";
import AddCourseCard from "../components/Dashboard/AddCourseCard";

const calculateMembershipDays = (joinDate) => {
  const today = new Date();

  const startDate = new Date(joinDate);

  const difference = today - startDate;

  return Math.floor(difference / (1000 * 60 * 60 * 24));
};

const Dashboard = () => {
  /* first login date */

  let joinDate = localStorage.getItem("joinDate");

  if (!joinDate) {
    joinDate = new Date().toISOString();

    localStorage.setItem("joinDate", joinDate);
  }

  /* courses */

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "دوره یادگیری پایتون",
      progress: 40,
    },
  ]);

  /* add course */

  const addCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      title: `دوره جدید ${courses.length + 1}`,
      progress: 0,
    };

    setCourses([...courses, newCourse]);
  };

  /* update progress */

  const updateProgress = (id, newProgress) => {
    const updatedCourses = courses.map((course) => {
      if (course.id === id) {
        return {
          ...course,
          progress: newProgress,
        };
      }

      return course;
    });

    setCourses(updatedCourses);
  };

  /* completed courses */

  const completedCourses = courses.filter(
    (course) => course.progress === 100,
  ).length;

  return (
    <div className="dashboard-page">
      <ProfileSection />

      <div className="dashboard-content">
        <div className="dashboard-right">
          <div className="stats-section">
            <h2>آمار کلی</h2>

            <div className="stats-grid">
              <StatsCard number={completedCourses} title="دوره های تکمیل شده" />

              <StatsCard
                number={courses.length}
                title="تعداد دوره های در حال یادگیری"
              />

              <StatsCard
                number={calculateMembershipDays(joinDate)}
                title="تعداد روزهای عضویت"
              />
            </div>
          </div>

          <div className="courses-section">
            <h2>دوره های در حال یادگیری</h2>

            <div className="courses-grid">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  progress={course.progress}
                  updateProgress={updateProgress}
                />
              ))}

              <AddCourseCard addCourse={addCourse} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
