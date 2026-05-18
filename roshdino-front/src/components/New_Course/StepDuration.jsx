import React, { useState } from 'react';
import OptionGrid from './OptionGrid';

import calendar_icon from "../../assets/Calender.svg";
import clock_icon from "../../assets/clock.svg";

const durations = [
  { name: 'کوتاه‌مدت (1 تا 2 هفته)',  },
  { name: 'متوسط (3 هفته تا 1 ماه)', icon: clock_icon },
  { name: 'بلندمدت (1 تا 3 ماه)' , icon: calendar_icon},
  { name: 'طولانی مدت (4 ماه و بیشتر)' }
];

const StepDuration = ({ dispatch, nextStep, prevStep, selected }) => {
  const [currentSelection, setCurrentSelection] = useState(selected || '');

  const handleNext = () => {
    if (!currentSelection) {
      alert('لطفاً یک مدت زمان انتخاب کنید.');
      return;
    }
    dispatch({ type: 'SET_DURATION', payload: currentSelection });
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
        <button className="button" onClick={prevStep}>بازگشت</button>
        <button className="button" onClick={handleNext}>ادامه</button>
      </div>
    </>
  );
};

export default StepDuration;