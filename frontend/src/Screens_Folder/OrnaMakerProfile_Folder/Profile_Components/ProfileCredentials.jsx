import React from 'react';
import './ProfileCredentials.css';

const ProfileCredentials = ({ data }) => {
  if (!data.certificate || data.certificate.length === 0) return null;

  return (
    <div className="chromatic-section profile-credentials">
      <div className="credential-banner">
        <div className="credential-bg"></div>
        <div className="credential-content">
          <div className="credential-icon-wrapper">
            <span className="credential-icon">📜</span>
          </div>
          <div className="credential-text">
            <h3 className="credential-title">Verified Artisan</h3>
            <p className="credential-subtitle">Official Documentation</p>
          </div>
          <a href={data.certificate[0].url} target="_blank" rel="noreferrer" className="btn-view-pdf">
            View
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCredentials;
