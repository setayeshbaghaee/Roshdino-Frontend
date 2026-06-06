import React, { useState } from "react";
import OptionGrid from "./OptionGrid";

import online_icon from "../../assets/logos/online.png";
import video_icon from "../../assets/logos/video.png";
import article_icon from "../../assets/logos/article.png";
import voice_icon from "../../assets/logos/voice.png";

const filters = [
  {
    name: "دوره / مجازی",
    value: "course",
    icon: online_icon,
  },
  {
    name: "ویدئو",
    value: "video",
    icon: video_icon,
  },
  {
    name: "صوتی / پادکست",
    value: "podcast",
    icon: voice_icon,
  },
  {
    name: "مقاله",
    value: "article",
    icon: article_icon,
  },
];

const StepFilter = ({ dispatch, prevStep, selected, handleSubmit }) => {
  const initialName = filters.find((item) => item.value === selected)?.name || "";
  const [currentSelection, setCurrentSelection] = useState(initialName);

  const handleNext = () => {
    const selectedItem = filters.find((item) => item.name === currentSelection);

    if (!selectedItem) {
      alert("لطفاً نوع آموزش را انتخاب کنید.");
      return;
    }

    dispatch({
      type: "SET_RESOURCE_TYPE",
      payload: selectedItem.value,
    });

    handleSubmit(selectedItem.value);
  };

  return (
    <>
      <h2>فیلتر آموزش</h2>
      <div className="divider"></div>

      <OptionGrid
        options={filters}
        selected={currentSelection}
        setSelected={setCurrentSelection}
        columns={2}
      />

      <div className="button-row">
        <button className="button" onClick={prevStep}>
          بازگشت
        </button>
        <button className="button" onClick={handleNext}>
          ثبت فرم
        </button>
      </div>
    </>
  );
};

export default StepFilter;