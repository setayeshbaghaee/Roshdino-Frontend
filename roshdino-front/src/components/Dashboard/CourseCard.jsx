const CourseCard = ({
  title,
  progress = 0,
  id,
  onDelete,
  skillIcon,
  onOpen,
}) => {
  const isCompleted = Number(progress) == 100;

  return (
    <div className="course-card">

      <button className="delete-btn" onClick={() => onDelete(id)}>
        ✕
      </button>

      <div className="course-image">
        <img src={skillIcon} alt="skill" />
      </div>

      <div className="course-info">
        <h3>{title}</h3>

        <div className="progress-top">
          <span>{isCompleted ? "تکمیل شده" : `${progress}%`}</span>
        </div>

        <div className="progress-container">
          <div
            className="progress-fill"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {!isCompleted && (
          <button onClick={onOpen}>
            ادامه یادگیری
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;