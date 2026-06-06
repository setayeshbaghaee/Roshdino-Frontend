import React, { useState } from "react";
import OptionGrid from "./OptionGrid";

import money_icon from "../../assets/logos/money.png";
import free_icon from "../../assets/logos/free.png";

const accessTypes = [
  {
    name: "رایگان",
    value: true,
    icon: free_icon,
  },
  {
    name: "پولی",
    value: false,
    icon: money_icon,
  },
];

const StepAccess = ({ dispatch, nextStep, prevStep, selected }) => {
  const initialName = accessTypes.find((item) => item.value === selected)?.name || "";
  const [currentSelection, setCurrentSelection] = useState(initialName);

  const handleNext = () => {
    const selectedItem = accessTypes.find((item) => item.name === currentSelection);

    if (!selectedItem) {
      alert("لطفاً یک نوع دسترسی انتخاب کنید.");
      return;
    }

    dispatch({
      type: "SET_ACCESS",
      payload: selectedItem.value,
    });

    nextStep();
  };

  return (
    <>
      <h2>تعیین نوع دسترسی</h2>
      <div className="divider"></div>

      <OptionGrid
        options={accessTypes}
        selected={currentSelection}
        setSelected={setCurrentSelection}
        columns={2}
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

export default StepAccess;