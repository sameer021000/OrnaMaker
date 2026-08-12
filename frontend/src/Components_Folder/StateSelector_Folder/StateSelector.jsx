import React, { useState, useRef, useEffect } from 'react';
import './StateSelector.css';

const statesList = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const StateSelector = ({ label = 'State', value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (state) => {
    onChange(state);
    setIsOpen(false);
  };

  return (
    <div className="state-selector-container" ref={containerRef}>
      <label className="state-label">{label}</label>
      <div 
        className={`state-input-wrapper ${error ? 'state-error' : ''} ${isOpen ? 'state-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "state-value" : "state-placeholder"}>
          {value || "Select your state"}
        </span>
        <span className={`state-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>
      
      {isOpen && (
        <div className="state-dropdown">
          {statesList.map(state => (
            <div 
              key={state} 
              className={`state-option ${value === state ? 'selected' : ''}`}
              onClick={() => handleSelect(state)}
            >
              {state}
            </div>
          ))}
        </div>
      )}
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default StateSelector;
