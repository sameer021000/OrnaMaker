import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

// Sleek SVG Icons
const HomeIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "2"} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const ProfileIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "2"} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ReviewIcon = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "2"} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <div className="bottom-nav-wrapper">
      <div className="bottom-nav-glass">
        <div 
          className={`nav-item ${currentPath === '/actual-home' ? 'active' : ''}`}
          onClick={() => navigate('/actual-home')}
        >
          <div className="nav-icon">
            <HomeIcon active={currentPath === '/actual-home'} />
          </div>
          <span className="nav-label">Home</span>
        </div>
        
        <div 
          className={`nav-item ${currentPath === '/profile' ? 'active' : ''}`}
          onClick={() => navigate('/profile')}
        >
          <div className="nav-icon">
            <ProfileIcon active={currentPath === '/profile'} />
          </div>
          <span className="nav-label">Profile</span>
        </div>

        <div 
          className={`nav-item ${currentPath === '/reviews' ? 'active' : ''}`}
          onClick={() => navigate('/reviews')}
        >
          <div className="nav-icon">
            <ReviewIcon active={currentPath === '/reviews'} />
          </div>
          <span className="nav-label">Reviews</span>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
