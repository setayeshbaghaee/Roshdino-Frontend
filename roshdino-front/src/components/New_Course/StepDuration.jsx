import React, { useState } from "react";
import OptionGrid from "./OptionGrid";

import calendar_icon from "../../assets/logos/Calender.svg";
import clock_icon from "../../assets/logos/clock.svg";
import hourglass_icon from "../../assets/logos/hourglass.png";
import target_icon from "../../assets/logos/target.png";

const durations = [
  {
    name: "کوتاه‌مدت (1 تا 2 هفته)",
    value: "short",
    icon: hourglass_icon,
  },
  {
    name: "متوسط (3 هفته تا 1 ماه)",
    value: "medium",
    icon: clock_icon,
  },
  {
    name: "بلندمدت (1 تا 3 ماه)",
    value: "long",
    icon: calendar_icon,
  },
  {
    name: "طولانی مدت (4 ماه و بیشتر)",
    value: "too long",
    icon: target_icon,
  },
];

const StepDuration = ({ dispatch, nextStep, prevStep, selected }) => {
  const initialName = durations.find((item) => item.value === selected)?.name || "";
  const [currentSelection, setCurrentSelection] = useState(initialName);

  const handleNext = () => {
    const selectedItem = durations.find((item) => item.name === currentSelection);

    if (!selectedItem) {
      alert("لطفاً یک مدت زمان انتخاب کنید.");
      return;
    }

    dispatch({
      type: "SET_DURATION",
      payload: selectedItem.value,
    });

    nextStep();
  };

  return (
    <>
      <h2>انتخاب مدت زمان</h2>
      <div className="divider"></div>

      <OptionGrid
        options={durations}
        selected={currentSelection}
        setSelected={setCurrentSelection}
        columns={4}
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

export default StepDuration;