import React from 'react';
import './form_style.css';


const OptionGrid = ({
  options,
  selected,
  setSelected,
  selectedArray,
  toggleSelect,
  columns = 4
}) => {
  return (
    <div className="option-grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {options.map(option => {
        const isSelected = selectedArray
          ? selectedArray.includes(option.name)
          : selected === option.name;

        const handleClick = () => {
          if (selectedArray && toggleSelect) toggleSelect(option);
          else if (setSelected) setSelected(option.name);
        };

        return (
          <div
            key={option.name}
            className={`option ${isSelected ? 'selected' : ''}`}
            onClick={handleClick}
          >
            {option.icon && <img src={option.icon} alt={option.name} className="option-icon" />}
            {option.name}
          </div>
        );
      })}
    </div>
  );
};

export default OptionGrid;