import React, { useRef, useState } from 'react';
import './ImageUploader.css';

const ImageUploader = ({ label, multiple = false, files, onFilesChange, error, accept = "image/*" }) => {
  const fileInputRef = useRef(null);
  const [previewItem, setPreviewItem] = useState(null); // holds the URL to preview fullscreen

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;
    
    const newFiles = selectedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type // to distinguish video from image in preview
    }));

    if (multiple) {
      onFilesChange([...(files || []), ...newFiles]);
    } else {
      onFilesChange(newFiles[0]);
    }
  };

  const handleRemove = (e, index) => {
    e.stopPropagation(); // prevent opening preview when clicking remove
    if (multiple) {
      const newFiles = files.filter((_, i) => i !== index);
      onFilesChange(newFiles);
    } else {
      onFilesChange(null);
    }
  };

  const renderMedia = (fileObj, isThumbnail = true) => {
    if (!fileObj || !fileObj.url) return null;
    
    const isVideo = (fileObj.type && fileObj.type.startsWith('video')) || accept.includes('video');
    const isPdf = (fileObj.type && fileObj.type.includes('pdf')) || accept.includes('pdf');
    
    if (isVideo) {
      return (
        <video 
          src={fileObj.url} 
          autoPlay={!isThumbnail} 
          controls={!isThumbnail} 
          muted={isThumbnail} 
          loop={isThumbnail}
          playsInline
        />
      );
    }
    
    if (isPdf) {
      if (isThumbnail) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: '#f3f4f6', color: 'var(--color-error)', fontWeight: 'bold', fontSize: '1.25rem' }}>
            PDF
          </div>
        );
      } else {
        return (
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
            <span style={{ fontSize: '3rem' }}>📄</span>
            <p style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>PDF Document</p>
            <a 
              href={fileObj.url} 
              target="_blank" 
              rel="noreferrer"
              style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--color-gold-main)', color: '#fff', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontWeight: 600 }}
            >
              Open PDF
            </a>
          </div>
        );
      }
    }

    return <img src={fileObj.url} alt="Preview" />;
  };

  return (
    <div className={`uploader-container ${error ? 'uploader-error' : ''}`}>
      {label && <label className="uploader-label">{label}</label>}
      
      <div className="uploader-grid">
        {!multiple && files && (
          <div className="preview-box single-preview" onClick={() => setPreviewItem(files)}>
            {renderMedia(files)}
            <button type="button" className="btn-remove" onClick={(e) => handleRemove(e)}>×</button>
          </div>
        )}

        {multiple && files && files.map((fileObj, index) => (
          <div key={index} className="preview-box" onClick={() => setPreviewItem(fileObj)}>
            {renderMedia(fileObj)}
            <button type="button" className="btn-remove" onClick={(e) => handleRemove(e, index)}>×</button>
          </div>
        ))}

        {(!files || (multiple && files.length >= 0) || (!multiple && !files)) && (
          <div 
            className="upload-placeholder" 
            onClick={() => fileInputRef.current.click()}
          >
            <span className="plus-icon">+</span>
            <span className="upload-text">Upload</span>
          </div>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple={multiple}
        accept={accept}
        style={{ display: 'none' }}
      />
      
      {error && <span className="error-text">{error}</span>}

      {/* Fullscreen Preview Modal */}
      {previewItem && (
        <div className="preview-modal" onClick={() => setPreviewItem(null)}>
          <div className="preview-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close-modal" onClick={() => setPreviewItem(null)}>×</button>
            {renderMedia(previewItem, false)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
