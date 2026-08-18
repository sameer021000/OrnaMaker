import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSignUp } from '../../Context_Folder/SignUpContext';
import './ProfileGalleryScreen.css';

const GalleryTitleMap = {
  'shop-photos': 'Shop Ambience',
  'work-images': 'Masterpieces',
  'shop-videos': 'Shop Tours',
  'work-videos': 'In The Workshop'
};

const ProfileGalleryScreen = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { signUpData } = useSignUp();

  if (!signUpData.firstName) {
    navigate('/signup', { replace: true });
    return null;
  }

  let items = [];
  if (type === 'shop-photos') items = signUpData.shopPhotos || [];
  if (type === 'work-images') items = signUpData.workImages || [];
  if (type === 'shop-videos') items = signUpData.shopVideos || [];
  if (type === 'work-videos') items = signUpData.workVideos || [];

  const isVideo = type && type.includes('video');
  const title = GalleryTitleMap[type] || 'Gallery';

  const openFullscreenMedia = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="gallery-screen-container">
      <div className="gallery-screen-header">
        <button className="btn-back-chromatic" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <h1 className="gallery-screen-title">{title}</h1>
      </div>

      <div className="gallery-screen-grid">
        {items.length === 0 ? (
          <p className="empty-message">No media available.</p>
        ) : (
          items.map((item, idx) => (
            <div key={idx} className="gallery-screen-item" onClick={() => openFullscreenMedia(item.url)}>
              {isVideo ? (
                <>
                  <video src={item.url} />
                  <div className="pink-play-overlay">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </>
              ) : (
                <img src={item.url} alt={`${title} ${idx}`} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileGalleryScreen;
