import React from "react";
import "./form_style.css";

import online_icon from "../../assets/logos/online.png";
import video_icon from "../../assets/logos/video.png";
import article_icon from "../../assets/logos/article.png";
import voice_icon from "../../assets/logos/voice.png";

const resourceIcons = {
  course: online_icon,
  video: video_icon,
  article: article_icon,
  podcast: voice_icon,
};

const resourceLabels = {
  course: "دوره / مجازی",
  video: "ویدئو",
  article: "مقاله",
  podcast: "صوتی / پادکست",
};

const levelLabels = {
  beginner: "مبتدی",
  intermediate: "متوسط",
  advanced: "پیشرفته",
};

const durationLabels = {
  short: "کوتاه‌مدت",
  medium: "متوسط",
  long: "بلندمدت",
  "too long": "طولانی‌مدت",
};

const SuggestedCourse = ({
  course,
  loading,
  error,
  addLoading,
  onCancel,
  onConfirm,
}) => {
  if (loading) {
    return (
      <div className="suggested-content">
        <h2>دوره پیشنهادی</h2>
        <div className="divider"></div>

        <div className="suggested-course-box loading-box">
          <p>در حال جستجوی دوره مناسب...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="suggested-content">
        <h2>دوره پیشنهادی</h2>
        <div className="divider"></div>

        <div className="suggested-course-box error-box">
          <p>{error}</p>
        </div>

        <div className="suggested-buttons">
          <button className="button cancel-light" onClick={onCancel}>
            بازگشت و تغییر فیلترها
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="suggested-content">
        <h2>دوره پیشنهادی</h2>
        <div className="divider"></div>

        <div className="suggested-course-box error-box">
          <p>دوره‌ای برای نمایش وجود ندارد.</p>
        </div>

        <div className="suggested-buttons">
          <button className="button cancel-light" onClick={onCancel}>
            بازگشت
          </button>
        </div>
      </div>
    );
  }

  const icon = resourceIcons[course.resource_type] || online_icon;

  return (
    <div className="suggested-content">
      <h2>دوره پیشنهادی</h2>
      <div className="divider"></div>

      <div className="suggested-course-box">
        <div className="suggested-course-icon-wrapper">
          <img
            src={icon}
            alt={course.resource_type}
            className="suggested-course-icon"
          />
        </div>

        <h3 className="suggested-course-title">{course.title}</h3>

        {course.description && (
          <p className="suggested-course-description">
            {course.description}
          </p>
        )}

        <div className="suggested-course-details">
          <div className="suggested-detail-item">
            <span>مهارت</span>
            <strong>{course.skill_name}</strong>
          </div>

          <div className="suggested-detail-item">
            <span>زیرمهارت</span>
            <strong>{course.subskill_name}</strong>
          </div>

          <div className="suggested-detail-item">
            <span>نوع آموزش</span>
            <strong>{resourceLabels[course.resource_type] || course.resource_type}</strong>
          </div>

          <div className="suggested-detail-item">
            <span>سطح</span>
            <strong>{levelLabels[course.level] || course.level}</strong>
          </div>

          <div className="suggested-detail-item">
            <span>مدت زمان</span>
            <strong>{durationLabels[course.duration_minutes] || course.duration_minutes}</strong>
          </div>

          <div className="suggested-detail-item">
            <span>دسترسی</span>
            <strong>{course.is_free ? "رایگان" : "پولی"}</strong>
          </div>
        </div>

        {course.provider_name && (
          <p className="suggested-provider">
            ارائه‌دهنده: {course.provider_name}
          </p>
        )}

        {course.url && (
          <a
            href={course.url}
            target="_blank"
            rel="noreferrer"
            className="suggested-course-link"
          >
            مشاهده لینک دوره
          </a>
        )}
      </div>

      <div className="suggested-buttons">
        <button className="button cancel-light" onClick={onCancel}>
          لغو
        </button>

        <button className="button" onClick={onConfirm} disabled={addLoading}>
          {addLoading ? "در حال اضافه کردن..." : "تایید و شروع یادگیری"}
        </button>
      </div>
    </div>
  );
};

export default SuggestedCourse;