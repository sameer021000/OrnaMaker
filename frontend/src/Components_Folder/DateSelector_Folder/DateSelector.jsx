import React, { useRef } from 'react';
import './DateSelector.css';

const DateSelector = ({ label = 'Since when ?', value, onChange, error }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (inputRef.current) {
      if (typeof inputRef.current.showPicker === 'function') {
        inputRef.current.showPicker();
      } else {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className="date-selector-container">
      <label className="date-label">{label}</label>
      <div 
        className={`date-input-wrapper ${error ? 'date-error' : ''}`}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="date"
          className="date-field"
          value={value}
          onChange={onChange}
        />
        <div className="date-overlay">
          {value ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Select a date'}
        </div>
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default DateSelector;

