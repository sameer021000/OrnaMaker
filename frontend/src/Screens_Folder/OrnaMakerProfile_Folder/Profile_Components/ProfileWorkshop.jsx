import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileWorkshop.css';

const EdgeGallery = ({ title, items, type }) => {
  const navigate = useNavigate();

  if (!items || items.length === 0) return null;

  const isVideo = type.includes('video');

  return (
    <div className="edge-gallery-block">
      <div className="edge-gallery-header">
        <h3 className="edge-gallery-title">{title}</h3>
        <button 
          className="btn-pink-text"
          onClick={() => navigate(`/ornamaker-profile/gallery/${type}`)}
        >
          View All
        </button>
      </div>
      
      <div className="edge-scroll-container">
        {items.map((item, idx) => (
          <div key={idx} className="edge-gallery-item" onClick={() => window.open(item.url, '_blank')}>
            {isVideo ? (
              <>
                <video src={item.url} muted loop playsInline />
                <div className="pink-play-overlay">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </>
            ) : (
              <img src={item.url} alt={`${title} ${idx}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileWorkshop = ({ data }) => {
  const hasAnyMedia = (data.shopPhotos?.length > 0) || 
                      (data.workImages?.length > 0) || 
                      (data.shopVideos?.length > 0) || 
                      (data.workVideos?.length > 0);

  if (!hasAnyMedia) return null;

  return (
    <div className="chromatic-section profile-workshop">
      <h2 className="chromatic-section-title" style={{ color: 'var(--color-pink-accent)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        Visual Showcase
      </h2>
      
      <EdgeGallery title="Masterpieces" items={data.workImages} type="work-images" />
      <EdgeGallery title="In The Workshop" items={data.workVideos} type="work-videos" />
      <EdgeGallery title="Shop Ambience" items={data.shopPhotos} type="shop-photos" />
      <EdgeGallery title="Shop Tours" items={data.shopVideos} type="shop-videos" />
    </div>
  );
};

export default ProfileWorkshop;
