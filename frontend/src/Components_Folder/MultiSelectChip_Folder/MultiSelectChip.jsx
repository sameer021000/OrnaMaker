import React from 'react';
import './MultiSelectChip.css';

const MultiSelectChip = ({
  options,
  selectedOptions,
  onChange,
  error,
  label = 'Work'
}) => {
  const toggleOption = (optionValue) => {
    if (selectedOptions.includes(optionValue)) {
      onChange(selectedOptions.filter((val) => val !== optionValue));
    } else {
      onChange([...selectedOptions, optionValue]);
    }
  };

  return (
    <div className="multiselect-container">
      <label className="multiselect-label">{label}</label>
      <div className={`multiselect-chips ${error ? 'multiselect-error' : ''}`}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`chip-btn ${selectedOptions.includes(option.value) ? 'chip-selected' : ''}`}
            onClick={() => toggleOption(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default MultiSelectChip;
