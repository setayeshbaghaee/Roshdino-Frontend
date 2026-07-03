import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCourse } from "./api";
import defaultCourseImage from "../../assets/course-placeholder.png";
import "./CourseGrid.css";

function CourseCard({ course }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function handleAddCourse() {

    const token = localStorage.getItem("access_token");
        
    if (!token) {
      alert("برای افزودن دوره ابتدا باید وارد حساب کاربری خود شوید.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
    
      await addCourse(course.id);
    
      alert("دوره با موفقیت به داشبورد اضافه شد.");
    
    } catch (err) {
          
      console.error(err);   
      if (err.response?.data?.detail) {
          alert(err.response.data.detail);
      } 
      else if (err.response?.data?.errors) {
          alert(JSON.stringify(err.response.data.errors));
      } 
      else {
          alert("خطا در افزودن دوره.");
      }
    } finally {

    setLoading(false);

    }
    }

  return (
    <div className="course-card">

        <div className="course-image-container">
  <img
    src={defaultCourseImage}
    alt={course.title}
    className="course-image"
  />
</div>

      <div className="course-content">

        <span className="course-skill">
          {course.skill_name}
        </span>

        <h3>{course.title}</h3>

        <p>{course.description}</p>

        <div className="course-info">

          <span>
            📺 {course.provider_name}
          </span>

          <span>
            📈 {course.level}
          </span>

        </div>

        <div className="course-info">

          <span>
            🎥 {course.resource_type}
          </span>

          <span>
            ⏱ {course.duration_minutes}
          </span>

        </div>

        <button
          className="course-btn"
          onClick={handleAddCourse}
          disabled={loading}
        >
          {loading ? "در حال افزودن..." : "افزودن به داشبورد"}
        </button>

      </div>

    </div>
  );
}

export default CourseCard;