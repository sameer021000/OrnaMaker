import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../../Context_Folder/SignUpContext';
import IdentityHeader from '../../Components_Folder/OrnaMakerProfileComponents_Folder/IdentityHeader_Folder/IdentityHeader';
import ExpertiseSection from '../../Components_Folder/OrnaMakerProfileComponents_Folder/ExpertiseSection_Folder/ExpertiseSection';
import PortfolioCarousel from '../../Components_Folder/OrnaMakerProfileComponents_Folder/PortfolioCarousel_Folder/PortfolioCarousel';
import OperationsSection from '../../Components_Folder/OrnaMakerProfileComponents_Folder/OperationsSection_Folder/OperationsSection';
import AddressSection from '../../Components_Folder/OrnaMakerProfileComponents_Folder/AddressSection_Folder/AddressSection';
import BottomNav from '../../Components_Folder/BottomNav_Folder/BottomNav';
import './OrnaMakerProfile.css';

const OrnaMakerProfile = () => {
  const navigate = useNavigate();
  const { signUpData } = useSignUp();
  
  const [fullscreenMedia, setFullscreenMedia] = useState(null);

  useEffect(() => {
    if (!signUpData.firstName) {
      navigate('/signup', { replace: true });
    }
  }, [signUpData.firstName, navigate]);

  const handleMediaClick = (mediaItem) => {
    setFullscreenMedia(mediaItem);
  };

  const closeFullscreen = () => {
    setFullscreenMedia(null);
  };

  return (
    <div className="profile-container">
      <div className="profile-scroll-content">
        <IdentityHeader data={signUpData} />
        <ExpertiseSection data={signUpData} />
        <PortfolioCarousel data={signUpData} onMediaClick={handleMediaClick} />
        <OperationsSection data={signUpData} />
        <AddressSection data={signUpData} />
      </div>

      <BottomNav />

      {/* Fullscreen Media Modal */}
      {fullscreenMedia && (
        <div className="media-modal-overlay" onClick={closeFullscreen}>
          <div className="media-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close-modal" onClick={closeFullscreen}>×</button>
            {fullscreenMedia.type && fullscreenMedia.type.includes('video') ? (
              <video src={fullscreenMedia.url} controls autoPlay playsInline />
            ) : (
              <img src={fullscreenMedia.url} alt="Fullscreen View" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrnaMakerProfile;
