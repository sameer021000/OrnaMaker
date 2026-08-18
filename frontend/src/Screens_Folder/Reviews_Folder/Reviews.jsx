import React from 'react';
import BottomNav from '../../Components_Folder/BottomNav_Folder/BottomNav';
import './Reviews.css';

const Reviews = () => {
  return (
    <div className="reviews-screen">
      <div className="reviews-content">
        <p className="welcome-text">Reviews</p>
        <p className="sub-text">Your reviews will appear here.</p>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Reviews;
