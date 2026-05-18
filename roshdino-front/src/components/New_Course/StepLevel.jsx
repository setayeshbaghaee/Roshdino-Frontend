import React, { useState } from 'react';
import OptionGrid from './OptionGrid';

const levels = [
  { name: 'مبتدی' },
  { name: 'متوسط' },
  { name: 'پیشرفته' }
];

const StepLevel = ({ dispatch, nextStep, prevStep, selected }) => {
  const [currentSelection, setCurrentSelection] = useState(selected || '');

  const handleNext = () => {
    if (!currentSelection) {
      alert('لطفاً یک سطح انتخاب کنید.');
      return;
    }
    dispatch({ type: 'SET_LEVEL', payload: currentSelection });
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
        <button className="button" onClick={prevStep}>بازگشت</button>
        <button className="button" onClick={handleNext}>ادامه</button>
      </div>
    </>
  );
};

export default StepLevel;