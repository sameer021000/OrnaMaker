import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <div className="bottom-nav">
      <div 
        className={`nav-item ${currentPath === '/actual-home' ? 'active' : ''}`}
        onClick={() => navigate('/actual-home')}
      >
        <div className="nav-icon">🏠</div>
        <span className="nav-label">Home</span>
      </div>
      
      <div 
        className={`nav-item ${currentPath === '/profile' ? 'active' : ''}`}
        onClick={() => navigate('/profile')}
      >
        <div className="nav-icon">👤</div>
        <span className="nav-label">Profile</span>
      </div>

      <div 
        className={`nav-item ${currentPath === '/reviews' ? 'active' : ''}`}
        onClick={() => navigate('/reviews')}
      >
        <div className="nav-icon">⭐</div>
        <span className="nav-label">Reviews</span>
      </div>
    </div>
  );
};

export default BottomNav;
