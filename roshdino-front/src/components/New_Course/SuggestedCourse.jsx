import React from 'react';
import './form_style.css';

const SuggestedCourse = ({ courseName = "ورزش", onCancel, onConfirm }) => {
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
  };

  return (
    <div className="suggested-content">
      <h2>دوره پیشنهادی</h2>
      <div className="divider"></div>

      <div className="suggested-box">
        <div className="course-name">
          {courseName}
        </div>
      </div>

      <div className="suggested-buttons">
        <button className="button cancel-light" onClick={onCancel}>
          لغو
        </button>

        <button className="button" onClick={handleConfirm}>
          تایید و شروع یادگیری
        </button>
      </div>
    </div>
  );
};

export default SuggestedCourse;