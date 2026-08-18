import React from 'react';
import './ProfileIdentity.css';

const ProfileIdentity = ({ data }) => {
  return (
    <div className="profile-identity">
      <div className="identity-mesh-bg"></div>
      
      <div className="identity-content">
        <div className="avatar-wrapper">
          {data.profilePic && data.profilePic.url ? (
            <img src={data.profilePic.url} alt="Profile" />
          ) : (
            <div className="avatar-placeholder"></div>
          )}
        </div>
        
        <h1 className="identity-name">{data.firstName} {data.lastName}</h1>
        
        <div className="identity-details">
          <span className="identity-id">@{data.ornaMakerId || 'artisan'}</span>
          <span className="dot-separator">•</span>
          <span className="identity-location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {data.shopCity || 'Location'}
          </span>
        </div>
        
        <div className="shop-name-banner">
          {data.shopName || 'Artisan Workshop'}
        </div>
      </div>
    </div>
  );
};

export default ProfileIdentity;
