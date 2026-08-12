import React from 'react';
import './PhoneBox.css';

const PhoneBox = ({
  label = 'Phonenumber',
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div className="phone-box-container">
      <label className="phone-label">{label}</label>
      <div className={`phone-input-wrapper ${error ? 'phone-error' : ''}`}>
        <span className="phone-prefix">+91</span>
        <input
          type="text"
          className="phone-field"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="0000000000"
          maxLength={10}
        />
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default PhoneBox;
