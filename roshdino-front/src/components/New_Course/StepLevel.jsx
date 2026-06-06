import React, { useState } from "react";
import OptionGrid from "./OptionGrid";

import begginer_icon from "../../assets/logos/begginer.png";
import intermediate_icon from "../../assets/logos/intermediate.png";
import advance_icon from "../../assets/logos/advance.png";

const levels = [
  {
    name: "مبتدی (شروع مسیر یادگیری)",
    value: "beginner",
    icon: begginer_icon,
  },
  {
    name: "متوسط (دارای تجربه اولیه)",
    value: "intermediate",
    icon: intermediate_icon,
  },
  {
    name: "پیشرفته (تجربه و مهارت بالا)",
    value: "advanced",
    icon: advance_icon,
  },
];

const StepLevel = ({ dispatch, nextStep, prevStep, selected }) => {
  const initialName = levels.find((item) => item.value === selected)?.name || "";
  const [currentSelection, setCurrentSelection] = useState(initialName);

  const handleNext = () => {
    const selectedItem = levels.find((item) => item.name === currentSelection);

    if (!selectedItem) {
      alert("لطفاً یک سطح انتخاب کنید.");
      return;
    }

    dispatch({
      type: "SET_LEVEL",
      payload: selectedItem.value,
    });

    nextStep();
  };

  return (
    <>
      <h2>سطح فعلی</h2>
      <div className="divider"></div>

      <OptionGrid
        options={levels}
        selected={currentSelection}
        setSelected={setCurrentSelection}
        columns={3}
      />

      <div className="button-row">
        <button className="button" onClick={prevStep}>
          بازگشت
        </button>
        <button className="button" onClick={handleNext}>
          ادامه
        </button>
      </div>
    </>
  );
};

export default StepLevel;