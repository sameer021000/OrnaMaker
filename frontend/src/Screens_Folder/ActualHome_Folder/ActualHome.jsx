import React from 'react';
import BottomNav from '../../Components_Folder/BottomNav_Folder/BottomNav';
import './ActualHome.css';

const ActualHome = () => {
  return (
    <div className="actual-home-screen">
      <div className="actual-home-content">
        {/* Placeholder for future home screen content */}
        <p className="welcome-text">Welcome to OrnaMilan.</p>
        <p className="sub-text">Use the bottom navigation to view your Profile.</p>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default ActualHome;
