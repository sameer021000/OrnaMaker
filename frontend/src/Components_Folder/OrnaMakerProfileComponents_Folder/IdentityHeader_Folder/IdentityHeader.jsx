import React from 'react';
import './IdentityHeader.css';

const IdentityHeader = ({ data }) => {
  const profilePicUrl = data.profilePic && data.profilePic.url ? data.profilePic.url : null;

  return (
    <div className="identity-header">
      <div className="header-gradient"></div>
      
      <div className="header-content">
        <div className="avatar-container">
          {profilePicUrl ? (
            <img src={profilePicUrl} alt="Profile" className="profile-img" />
          ) : (
            <div className="profile-placeholder"></div>
          )}
        </div>
        
        <div className="identity-info">
          <h1 className="full-name">{data.firstName} {data.lastName}</h1>
          <h2 className="shop-name">{data.shopName}</h2>
          
          <div className="location-tag">
            <span className="icon">📍</span>
            {data.shopCity}
          </div>
          
          <div className="maker-id-tag">
            <span className="label">OrnaMaker ID:</span> {data.ornaMakerId || 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityHeader;
