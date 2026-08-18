import React from 'react';
import './ExpertiseSection.css';

const WORK_MAP = {
  'maker': 'Ornament Maker',
  'cutting': 'Ornament Cutting',
  'enamel': 'Enamel on Ornament',
  'polish': 'Ornament Polish'
};

const ExpertiseSection = ({ data }) => {
  return (
    <div className="profile-section expertise-section">
      <h3 className="section-heading">Craftsmanship</h3>
      
      <div className="expertise-group">
        <h4 className="group-title">Types of Works</h4>
        <div className="tags-container">
          {data.work && data.work.map(w => (
            <span key={w} className="tag work-tag">
              {WORK_MAP[w] || w}
            </span>
          ))}
        </div>
      </div>

      <div className="expertise-group">
        <h4 className="group-title">Types of Ornaments</h4>
        <div className="tags-container">
          {data.ornamentTypes && data.ornamentTypes.map(type => {
            if (type === 'others') return null;
            return (
              <span key={type} className="tag ornament-tag">
                {type}
              </span>
            );
          })}
          {data.ornamentTypes && data.ornamentTypes.includes('others') && data.otherOrnamentType && (
            <span className="tag ornament-tag">
              {data.otherOrnamentType}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertiseSection;
