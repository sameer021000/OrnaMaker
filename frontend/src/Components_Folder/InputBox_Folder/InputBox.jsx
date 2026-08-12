import React from 'react';
import './InputBox.css';

const InputBox = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  type = 'text',
  maxLength,
}) => {
  return (
    <div className="input-box-container">
      <label className="input-label">{label}</label>
      <input
        type={type}
        className={`input-field ${error ? 'input-error' : ''}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default InputBox;
