const CourseCard = ({
  title,
  progress = 0,
  id,
  onDelete,
  imageUrl,
  onOpen,
}) => {
  const isCompleted = Number(progress) === 100;

  const courseImage = imageUrl
    ? imageUrl.replace(
        "http://roshdino.chbkn.run",
        "https://roshdino.chbkn.run"
      )
    : null;

  return (
    <div className="course-card">
      <button
        className="delete-btn"
        onClick={() => onDelete(id)}
      >
        ✕
      </button>

      <div
        className={`course-image ${courseImage ? "has-image" : "no-image"}`}
      >
        {courseImage ? (
          <img src={courseImage} alt={title} />
        ) : (
          <div className="course-image-placeholder">
            بدون تصویر
          </div>
        )}
      </div>

      <div className="course-content">
        <div className="course-text">
          <h3>{title}</h3>

          <div className="progress-top">
            <span>
              {isCompleted ? "تکمیل شده" : `${progress}%`}
            </span>
          </div>

          <div className="progress-container">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(Number(progress) || 0, 100)}%`,
              }}
            />
          </div>
        </div>

        {!isCompleted && (
          <button className="course-action-btn" onClick={onOpen}>
            ادامه یادگیری
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;