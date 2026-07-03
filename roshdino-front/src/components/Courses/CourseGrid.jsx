import CourseCard from "./CourseCard";

function CourseGrid({ courses }) {
  return (
    <div className="course-grid">

      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
        />
      ))}

    </div>
  );
}

export default CourseGrid;