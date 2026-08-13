import React from 'react';
import './SegmentedControl.css';

const SegmentedControl = ({ label, options, selectedValue, onChange }) => {
  return (
    <div className="segmented-container">
      {label && <label className="segmented-label">{label}</label>}
      <div className="segmented-control">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`segment-btn ${selectedValue === option.value ? 'active' : ''}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SegmentedControl;
