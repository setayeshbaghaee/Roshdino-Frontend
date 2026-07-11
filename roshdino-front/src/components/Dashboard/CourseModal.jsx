import { useMemo, useState } from "react";
import { updateCourseStep } from "../../api/courses";

const CourseModal = ({ course, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const steps = useMemo(() => {
    if (!Array.isArray(course?.steps)) return [];

    return [...course.steps].sort((a, b) => {
      const aOrder = Number(a.order);
      const bOrder = Number(b.order);

      return (
        (Number.isFinite(aOrder) ? aOrder : Number.MAX_SAFE_INTEGER) -
        (Number.isFinite(bOrder) ? bOrder : Number.MAX_SAFE_INTEGER)
      );
    });
  }, [course?.steps]);

  if (!course) return null;

  const courseTitle =
    course.course_title ||
    course.title ||
    course.course?.title ||
    "دوره";

  const courseUrl =
    course.url ||
    course.course_url ||
    course.course?.url ||
    course.resource?.url ||
    null;

  const progress = course.progress_percentage ?? 0;

  const handleCheck = async (step, index) => {
    const canClick = index === 0 || steps[index - 1]?.is_done === true;

    if (!canClick) {
      alert("باید مراحل به ترتیب انجام شوند");
      return;
    }

    try {
      setLoading(true);

      const updatedCourse = await updateCourseStep(
        course.id,
        step.id,
        !step.is_done
      );

      onUpdate({
        ...course,
        ...updatedCourse,
        url:
          updatedCourse?.url ||
          updatedCourse?.course_url ||
          updatedCourse?.course?.url ||
          courseUrl,
        steps: updatedCourse?.steps || course.steps,
      });
    } catch (err) {
      console.error("UPDATE COURSE STEP ERROR:", err);
      alert("خطا در بروزرسانی مرحله");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <section
        className="modal-box course-modal"
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="course-modal-header">
          <div>
            <h2 id="course-modal-title">{courseTitle}</h2>
            <p>میزان پیشرفت دوره: {progress}٪</p>
          </div>

          <div
            className="course-modal-progress"
            aria-label={`پیشرفت ${progress} درصد`}
          >
            <span style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }} />
          </div>
        </header>

        <div className="course-modal-link-card">
          <div className="course-modal-link-icon" aria-hidden="true">
            ↗
          </div>

          <div className="course-modal-link-content">
            <strong>لینک دوره</strong>
            <p>برای مشاهده محتوای اصلی دوره، لینک زیر را باز کنید.</p>

            {courseUrl ? (
              <a
                href={courseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="course-modal-link"
              >
                مشاهده دوره
              </a>
            ) : (
              <span className="course-modal-link-missing">
                لینک دوره موجود نیست
              </span>
            )}
          </div>
        </div>

        <section className="course-modal-steps">
          <h3>مراحل دوره</h3>

          {steps.length > 0 ? (
            <div className="course-modal-steps-list">
              {steps.map((step, index) => {
                const canClick =
                  index === 0 || steps[index - 1]?.is_done === true;
                const isDone = Boolean(step.is_done);

                return (
                  <label
                    key={step.id}
                    className={`course-modal-step-item${
                      isDone ? " is-done" : ""
                    }${!canClick ? " is-locked" : ""}`}
                  >
                    <span className="course-modal-step-number">
                      {index + 1}
                    </span>

                    <span className="course-modal-step-info">
                      <strong>{step.title}</strong>
                      <small>
                        مدت مرحله: {step.duration_minutes ?? 0} دقیقه
                      </small>
                    </span>

                    <span className="course-modal-step-action">
                      {!canClick ? (
                        <span className="course-modal-lock">🔒 قفل</span>
                      ) : (
                        <input
                          type="checkbox"
                          checked={isDone}
                          disabled={loading}
                          onChange={() => handleCheck(step, index)}
                          aria-label={`تغییر وضعیت ${step.title}`}
                        />
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
          ) : (
            <p className="course-modal-no-steps">
              هنوز مرحله‌ای برای این دوره ثبت نشده است.
            </p>
          )}
        </section>

        <div className="course-modal-footer">
          <button type="button" onClick={onClose} className="close-btn">
            بستن
          </button>
        </div>
      </section>
    </div>
  );
};

export default CourseModal;
