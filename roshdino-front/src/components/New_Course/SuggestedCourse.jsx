import React from 'react';
import './form_style.css';

// props:
// courseName: نام مهارت
// courseIcon: مسیر آیکون مهارت
// onCancel: تابع لغو
// onConfirm: تابع تایید
const SuggestedCourse = ({
  courseName = "ورزش",
  courseIcon = "/assets/logos/sports.png",
  onCancel,
  onConfirm
}) => {

  const handleConfirm = () => {
    alert(`دوره "${courseName}" اضافه شد!`);
    if (onConfirm) onConfirm();
  };

  return (
    <div className="suggested-content">
      <h2>دوره پیشنهادی</h2>
      <div className="divider"></div>

      <div className="suggested-card">
        <p className="suggested-name">{courseName}</p>
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