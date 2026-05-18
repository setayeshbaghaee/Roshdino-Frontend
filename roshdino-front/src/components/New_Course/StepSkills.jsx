import React, { useState } from 'react';
// import cookingIcon from '../../assets/cooking.png'; // مسیر لگوی آشپزی
// import musicIcon from '../../assets/music.png';    // مسیر لگوی موسیقی
// // ... سایر لگوها
import OptionGrid from './OptionGrid';
const skills = [
  { name: 'آشپزی',},
  { name: 'موسیقی',  },
  { name: 'نقاشی', },
  { name: 'برنامه‌نویسی', },
  { name: 'طراحی',  },
  { name: 'عکاسی', },
  { name: 'ورزش',  },
  { name: 'زبان‌آموزی',  },
];

const SteoSkills = ({ dispatch, nextStep, prevStep, selected }) => {
  const [currentSelection, setCurrentSelection] = useState(selected);

  const handleSelect = (skill) => {
    setCurrentSelection(skill.name);
  };

  const handleNext = () => {
    if (!currentSelection) {
      alert('لطفاً یک مهارت انتخاب کنید.');
      return;
    }
    dispatch({ type: 'SET_SKILL', payload: currentSelection });
    nextStep();
  };

  return (
    <>
      <h2>فهرست مهارت‌ها</h2>
      <div className="divider"></div>

      <OptionGrid 
        options={skills} 
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

export default SteoSkills;
