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
  const splitName = (name) => {
    const match = name.match(/^(.*?)\s*\((.*?)\)$/);

    if (match) {
      return {
        title: match[1],
        subtitle: match[2]
      };
    }

    return {
      title: name,
      subtitle: ''
    };
  };

  return (
    <div
      className="option-grid"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {options.map(option => {
        const isSelected = selectedArray
          ? selectedArray.includes(option.name)
          : selected === option.name;

        const handleClick = () => {
          if (selectedArray && toggleSelect) toggleSelect(option);
          else if (setSelected) setSelected(option.name);
        };

        const { title, subtitle } = splitName(option.name);

        return (
          <div
            key={option.name}
            className={`option ${isSelected ? 'selected' : ''}`}
            onClick={handleClick}
          >
            {option.icon && (
              <img
                src={option.icon}
                alt={option.name}
                className="option-icon"
              />
            )}

            <div className="option-text">
              <span className="option-title">{title}</span>

              {subtitle && (
                <span className="option-subtitle">{subtitle}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OptionGrid;