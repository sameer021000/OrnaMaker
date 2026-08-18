import React from 'react';
import './PortfolioCarousel.css';

const CarouselRow = ({ title, mediaArray, onMediaClick }) => {
  if (!mediaArray || mediaArray.length === 0) return null;

  return (
    <div className="carousel-container">
      <h4 className="carousel-title">{title}</h4>
      <div className="carousel-scroll">
        {mediaArray.map((item, idx) => {
          const isVideo = item.type ? item.type.includes('video') : (item.url && item.url.match(/\.(mp4|webm|ogg)$/i));
          
          return (
            <div 
              key={idx} 
              className="carousel-item" 
              onClick={() => onMediaClick(item)}
            >
              {isVideo ? (
                <>
                  <video src={item.url} />
                  <div className="play-overlay">▶</div>
                </>
              ) : (
                <img src={item.url} alt={`${title} ${idx}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PortfolioCarousel = ({ data, onMediaClick }) => {
  // Combine images and videos for a richer mixed gallery, or keep them separate.
  // The plan requested "Work Showcase" and "Workshop Tour" carousels.
  const workMedia = [...(data.workImages || []), ...(data.workVideos || [])];
  const shopMedia = [...(data.shopPhotos || []), ...(data.shopVideos || [])];

  if (workMedia.length === 0 && shopMedia.length === 0) return null;

  return (
    <div className="profile-section portfolio-section">
      <h3 className="section-heading">Portfolio</h3>
      
      <CarouselRow title="Work Showcase" mediaArray={workMedia} onMediaClick={onMediaClick} />
      <CarouselRow title="Workshop Tour" mediaArray={shopMedia} onMediaClick={onMediaClick} />
    </div>
  );
};

export default PortfolioCarousel;
