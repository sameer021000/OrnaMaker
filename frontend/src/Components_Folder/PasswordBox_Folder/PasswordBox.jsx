import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './PasswordBox.css';

const PasswordBox = ({
  label = 'Password',
  value,
  onChange,
  onBlur,
  error,
  initialVisible = false,
}) => {
  const [isVisible, setIsVisible] = useState(initialVisible);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="password-box-container">
      <label className="password-label">{label}</label>
      <div className={`password-input-wrapper ${error ? 'password-error' : ''}`}>
        <input
          type={isVisible ? 'text' : 'password'}
          className="password-field"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="********"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="password-eye-btn"
          aria-label="Toggle password visibility"
        >
          {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default PasswordBox;
