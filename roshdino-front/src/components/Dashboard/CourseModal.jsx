import { useState } from "react";
import { updateCourseStep } from "../../api/courses";

const CourseModal = ({ course, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  if (!course) return null;

  const steps = course.steps || [];

  const handleCheck = async (step, index) => {
    const canClick =
      index === 0 || steps[index - 1]?.is_done === true;

    if (!canClick) {
      alert("باید مراحل به ترتیب انجام شوند");
      return;
    }

    try {
      setLoading(true);

      const isDone = !step.is_done;

      const updatedCourse = await updateCourseStep(
        course.id,
        step.id,
        isDone
      );

      onUpdate(updatedCourse);
    } catch (err) {
      console.log(err);
      alert("خطا در بروزرسانی مرحله");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{course.course_title}</h2>

        <p>پیشرفت: {course.progress_percentage}%</p>

        <div className="steps-list">
          {steps.map((step, index) => {
            const canClick =
              index === 0 || steps[index - 1]?.is_done === true;

            return (
              <div key={step.id} className="step-item">
                <input
                  type="checkbox"
                  checked={Boolean(step.is_done)}
                  disabled={loading || !canClick}
                  onChange={() => handleCheck(step, index)}
                />

                <span>
                  {step.title} • {step.duration_minutes} min
                </span>

                {!canClick && (
                  <small className="lock">🔒 قفل</small>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="close-btn"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default CourseModal;