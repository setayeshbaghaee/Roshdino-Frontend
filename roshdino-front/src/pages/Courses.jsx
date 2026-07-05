import { useEffect, useState } from "react";
import CourseGrid from "../components/Courses/CourseGrid";
import { fetchCourses } from  "../api/all-course";

function Courses() {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  async function loadCourses() {
    try {
      const data = await fetchCourses();
      setCourses(data);

    } catch (err) {
      setError("خطا در دریافت دوره‌ها");
      console.error(err);

    } finally {
      setLoading(false);
    }
  }

  loadCourses();
  }, []);

  if (loading) {
    return <h2>در حال بارگذاری دوره‌ها...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }
  if (courses.length === 0) {
  return (
      <h3 className="empty-courses">
        هنوز دوره‌ای برای نمایش وجود ندارد.
      </h3>
  );
}

  return (
  <div className="courses-page">
    <section className="courses-hero">

    <div className="courses-content">

        <h2 className="courses-subtitle">
            دوره مورد نظر خود را انتخاب و یادگیری را آغاز کنید
        </h2>

    </div>

    </section>

    <CourseGrid courses={courses}/>

  </div>
  );
}

export default Courses;