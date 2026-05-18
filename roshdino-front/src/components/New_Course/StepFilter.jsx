import React, { useState } from 'react';
import OptionGridMulti from './OptionGrid';

const filters = [
  { name: 'مجازی' },
  { name: 'ویدئو' },
  { name: 'صوتی' },
  { name: 'مقاله' }
];

const StepFilter = ({ dispatch, prevStep, formState, handleSubmit }) => {
  const [selectedFilters, setSelectedFilters] = useState(formState.filter || []);

  const toggleFilter = (filter) => {
    setSelectedFilters(prev =>
      prev.includes(filter.name)
        ? prev.filter(f => f !== filter.name)
        : [...prev, filter.name]
    );
  };

  const handleNext = () => {
    dispatch({ type: 'SET_FILTER', payload: selectedFilters });
    handleSubmit();
  };

  return (
    <>
      <h2>فیلتر آموزش</h2>
      <div className="divider"></div>

      <OptionGridMulti
        options={filters}
        selectedArray={selectedFilters}
        toggleSelect={toggleFilter}
        columns={2} 
      />

      <div className="button-row">
        <button className="button" onClick={prevStep}>بازگشت</button>
        <button className="button" onClick={handleNext}>ثبت فرم</button>
      </div>
    </>
  );
};

export default StepFilter;