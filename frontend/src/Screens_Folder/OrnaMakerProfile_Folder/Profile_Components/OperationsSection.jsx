import React from 'react';
import './OperationsSection.css';

const OperationsSection = ({ data }) => {
  return (
    <div className="profile-section operations-section">
      <h3 className="section-heading">Operations</h3>
      
      <div className="operations-grid">
        <div className="op-item">
          <span className="op-icon">👥</span>
          <div className="op-text">
            <span className="op-label">Team Size</span>
            <span className="op-value">{data.teamSize || 'Individual'}</span>
          </div>
        </div>

        <div className="op-item">
          <span className="op-icon">⏰</span>
          <div className="op-text">
            <span className="op-label">Working Hours</span>
            <span className="op-value">
              {data.workingHoursFrom} - {data.workingHoursTo}
            </span>
          </div>
        </div>

        <div className="op-item">
          <span className="op-icon">📅</span>
          <div className="op-text">
            <span className="op-label">Working Days</span>
            <span className="op-value">
              {data.weeklyHolidays && data.weeklyHolidays.length > 0 
                ? `Closed on ${data.weeklyHolidays.join(', ')}`
                : 'Open All Days'}
            </span>
          </div>
        </div>
      </div>

      {data.certificate && data.certificate.length > 0 && (
        <div className="certificate-banner">
          <div className="cert-left">
            <span className="cert-icon">🛡️</span>
            <div className="cert-text">
              <span className="cert-title">Verified Artisan</span>
              <span className="cert-subtitle">Professional Certificate Provided</span>
            </div>
          </div>
          <a href={data.certificate[0].url} target="_blank" rel="noreferrer" className="btn-view-doc">
            View
          </a>
        </div>
      )}
    </div>
  );
};

export default OperationsSection;
