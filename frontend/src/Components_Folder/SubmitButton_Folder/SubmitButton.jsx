import React, { useState, useEffect } from 'react';
import './SubmitButton.css';

const SubmitButton = ({ onClick, text = 'Submit', className = '' }) => {
  const [status, setStatus] = useState('idle'); // idle, loading, error

  const handleClick = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    
    // Simulate validation check by calling the onClick prop, 
    // which should return true (success) or false (validation failed)
    try {
      const isValid = await onClick();
      if (isValid) {
        // If valid, it might navigate away, but let's just reset or keep loading
        // We will keep it loading if it's successful so they don't double click
      } else {
        // Validation failed, transition back to button
        setStatus('error');
        setTimeout(() => setStatus('idle'), 500); // revert back to idle quickly
      }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 500);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`submit-btn ${status !== 'idle' ? 'btn-loading' : ''} ${className}`}
      disabled={status === 'loading'}
    >
      <span className={`btn-text ${status !== 'idle' ? 'hidden' : ''}`}>{text}</span>
      <div className={`spinner ${status !== 'idle' ? 'visible' : ''}`}></div>
    </button>
  );
};

export default SubmitButton;
