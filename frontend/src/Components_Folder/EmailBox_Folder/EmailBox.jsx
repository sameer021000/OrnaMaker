import React from 'react';
import './EmailBox.css';

const EmailBox = ({
  label = 'Email',
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div className="email-box-container">
      <label className="email-label">{label}</label>
      <div className={`email-input-wrapper ${error ? 'email-error' : ''}`}>
        <input
          type="text"
          className="email-field"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="your.name"
        />
        <span className="email-suffix">@gmail.com</span>
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default EmailBox;
