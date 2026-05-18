import React, { useState } from 'react';
import OptionGrid from './OptionGrid';

const accessTypes = [
  { name: 'رایگان' },
  { name: 'پولی' }
];

const StepAccess = ({ dispatch, nextStep, prevStep, selected }) => {
  const [currentSelection, setCurrentSelection] = useState(selected || '');

  const handleNext = () => {
    if (!currentSelection) {
      alert('لطفاً یک نوع دسترسی انتخاب کنید.');
      return;
    }
    dispatch({ type: 'SET_ACCESS', payload: currentSelection });
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
        <button className="button" onClick={prevStep}>بازگشت</button>
        <button className="button" onClick={handleNext}>ادامه</button>
      </div>
    </>
  );
};

export default StepAccess;