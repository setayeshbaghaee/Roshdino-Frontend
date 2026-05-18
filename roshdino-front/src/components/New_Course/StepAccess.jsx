import React, { useState } from 'react';
import OptionGrid from './OptionGrid';
import money_icon from "../../assets/logos/money.png";
import free_icon from "../../assets/logos/free.png";

const accessTypes = [
  { name: 'رایگان', icon: free_icon },
  { name: 'پولی' , icon: money_icon }
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