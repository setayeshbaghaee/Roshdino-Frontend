const AddCourseCard = ({ addCourse }) => {
  return (
    <div className="add-course-card">
      <div className="plus-box">+</div>

      <div className="add-course-info">
        <h3>افزودن دوره جدید</h3>

        <p>دوره جدید خود را اضافه کنید</p>

        <button onClick={addCourse}>افزودن دوره</button>
      </div>
    </div>
  );
};

export default AddCourseCard;
