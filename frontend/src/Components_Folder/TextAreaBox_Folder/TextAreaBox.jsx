import React from 'react';
import './TextAreaBox.css';

const TextAreaBox = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  maxLength = 100,
}) => {
  return (
    <div className="textarea-box-container">
      <label className="textarea-label">{label}</label>
      <textarea
        className={`textarea-field ${error ? 'textarea-error' : ''}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={4}
      />
      <div className="textarea-footer">
        {error ? (
          <span className="error-text">{error}</span>
        ) : (
          <span className="empty-spacer"></span>
        )}
        <span className="char-count">
          {value ? value.length : 0}/{maxLength}
        </span>
      </div>
    </div>
  );
};

export default TextAreaBox;
