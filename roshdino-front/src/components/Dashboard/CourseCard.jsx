const CourseCard = ({ title, progress, updateProgress, id }) => {
  return (
    <div className="course-card">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLA8Wf3lPJMdMf2W_VpNPn9Bzyns1olLFeQg&s"
        alt="python course"
        className="course-image"
      />

      <div className="course-info">
        <h3>{title}</h3>

        <div className="progress-top">
          <span>{progress}%</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => updateProgress(id, Number(e.target.value))}
          className="progress-slider"
          style={{
            background: `linear-gradient(
              to right,
              #7aa35a 0%,
              #7aa35a ${progress}%,
              #ddd ${progress}%,
              #ddd 100%
            )`,
          }}
        />

        <button>ادامه یادگیری</button>
      </div>
    </div>
  );
};

export default CourseCard;
