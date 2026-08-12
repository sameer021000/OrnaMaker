import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ strength }) => {
  // strength is 0 to 5
  // 0: weak, 5: very strong
  let strengthLabel = 'Too short';
  let colorClass = 'bar-empty';

  if (strength === 1) {
    strengthLabel = 'Weak';
    colorClass = 'bar-weak';
  } else if (strength === 2) {
    strengthLabel = 'Fair';
    colorClass = 'bar-fair';
  } else if (strength === 3) {
    strengthLabel = 'Good';
    colorClass = 'bar-good';
  } else if (strength >= 4) {
    strengthLabel = 'Strong';
    colorClass = 'bar-strong';
  }

  const widthPercentage = Math.min(100, Math.max(0, (strength / 4) * 100));

  return (
    <div className="progress-container">
      <div className="progress-bar-bg">
        <div 
          className={`progress-bar-fill ${colorClass}`} 
          style={{ width: `${widthPercentage}%` }}
        />
      </div>
      <span className="progress-label">{strengthLabel}</span>
    </div>
  );
};

export default ProgressBar;
