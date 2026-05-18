import React, { useState } from 'react';
import cooking_Icon from '../../assets/logos/cooking.png'; 
import music_Icon from '../../assets/logos/music.png';  
import paint_Icon from '../../assets/logos/paint.png';  
import programing_Icon from '../../assets/logos/programing.png';  
import drawing_Icon from '../../assets/logos/drawing.png';  
import photo_Icon from '../../assets/logos/photo.png';  
import sport_Icon from '../../assets/logos/sport.png';  
import language_Icon from '../../assets/logos/language.png';  


import OptionGrid from './OptionGrid';
const skills = [
  { name: 'آشپزی', icon: cooking_Icon},
  { name: 'موسیقی',icon: music_Icon },
  { name: 'نقاشی', icon: paint_Icon},
  { name: 'برنامه‌نویسی',icon: programing_Icon },
  { name: 'طراحی',icon: drawing_Icon },
  { name: 'عکاسی',icon: photo_Icon },
  { name: 'ورزش', icon:sport_Icon },
  { name: 'زبان‌آموزی', icon: language_Icon },
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
