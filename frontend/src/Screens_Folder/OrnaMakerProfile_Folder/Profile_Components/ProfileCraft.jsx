import React from 'react';
import './ProfileCraft.css';

const WORK_MAP = {
  'maker': 'Ornament Maker',
  'cutting': 'Ornament Cutting',
  'enamel': 'Enamel Art',
  'polish': 'Ornament Polish'
};

const ProfileCraft = ({ data }) => {
  const dateStr = data.sinceWhen 
    ? new Date(data.sinceWhen).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'N/A';

  // Format ornament types beautifully
  const types = (data.ornamentTypes || []).filter(t => t !== 'others');
  if (data.ornamentTypes && data.ornamentTypes.includes('others') && data.otherOrnamentType) {
    types.push(data.otherOrnamentType);
  }

  return (
    <div className="chromatic-section profile-craft">
      <h2 className="chromatic-section-title" style={{ color: 'var(--color-violet-accent)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        Artisan Expertise
      </h2>
      
      <p className="craft-ornaments-text">
        {types.length > 0 ? types.join(' • ') : 'Crafts fine jewelry'}
      </p>

      <div className="craft-badges-container">
        {data.work && data.work.map(w => (
          <span key={w} className="violet-badge">
            {WORK_MAP[w] || w}
          </span>
        ))}
      </div>

      <p className="craft-since">
        <span className="since-label">Crafting Since</span>
        <span className="since-date">{dateStr}</span>
      </p>
    </div>
  );
};

export default ProfileCraft;
