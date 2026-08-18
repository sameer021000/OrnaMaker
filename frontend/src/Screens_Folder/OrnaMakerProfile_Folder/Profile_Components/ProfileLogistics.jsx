import React, { useState } from 'react';
import './ProfileLogistics.css';

const ProfileLogistics = ({ data }) => {
  const [activeTab, setActiveTab] = useState('hours'); // hours, shop, home

  return (
    <div className="chromatic-section profile-logistics">
      <h2 className="chromatic-section-title" style={{ color: 'var(--color-blue-accent)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        Logistics & Contact
      </h2>

      <div className="blue-tabs">
        <button 
          className={`blue-tab ${activeTab === 'hours' ? 'active' : ''}`}
          onClick={() => setActiveTab('hours')}
        >
          Hours
        </button>
        <button 
          className={`blue-tab ${activeTab === 'shop' ? 'active' : ''}`}
          onClick={() => setActiveTab('shop')}
        >
          Shop Addr
        </button>
        <button 
          className={`blue-tab ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Home Addr
        </button>
      </div>

      <div className="logistics-content-area">
        {activeTab === 'hours' && (
          <div className="logistics-fade-in hours-grid">
            <div className="hours-block">
              <p className="logistics-label">Team Size</p>
              <p className="logistics-value">{data.teamSize || 'Individual'}</p>
            </div>
            <div className="hours-block">
              <p className="logistics-label">Working Hours</p>
              <p className="logistics-value">{data.workingHoursFrom} - {data.workingHoursTo}</p>
            </div>
            <div className="hours-block full-width">
              <p className="logistics-label">Weekly Holidays</p>
              <p className="logistics-value">
                {data.weeklyHolidays && data.weeklyHolidays.length > 0 
                  ? data.weeklyHolidays.join(', ')
                  : 'None'}
              </p>
            </div>
          </div>
        )}

        {(activeTab === 'shop' || activeTab === 'home') && (
          <div className="logistics-fade-in address-layout">
            <p className="address-paragraph">
              {activeTab === 'shop' ? data.shopStreet : data.homeStreet}, <br />
              {activeTab === 'shop' ? data.shopLandmark : data.homeLandmark} <br /><br />
              <strong>{activeTab === 'shop' ? data.shopCity : data.homeCity}</strong>, {activeTab === 'shop' ? data.shopDistrict : data.homeDistrict} <br />
              {activeTab === 'shop' ? data.shopState : data.homeState} - {activeTab === 'shop' ? data.shopPincode : data.homePincode}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileLogistics;
