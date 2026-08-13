import React, { useRef } from 'react';
import './ImageUploader.css';

const ImageUploader = ({ label, multiple = false, files, onFilesChange, error }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;
    
    // Convert to dummy local preview URLs for demonstration
    const newFiles = selectedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));

    if (multiple) {
      onFilesChange([...files, ...newFiles]);
    } else {
      onFilesChange(newFiles[0]);
    }
  };

  const handleRemove = (index) => {
    if (multiple) {
      const newFiles = files.filter((_, i) => i !== index);
      onFilesChange(newFiles);
    } else {
      onFilesChange(null);
    }
  };

  return (
    <div className={`uploader-container ${error ? 'uploader-error' : ''}`}>
      {label && <label className="uploader-label">{label}</label>}
      
      <div className="uploader-grid">
        {!multiple && files && (
          <div className="preview-box single-preview">
            <img src={files.url} alt="Preview" />
            <button type="button" className="btn-remove" onClick={() => handleRemove()}>×</button>
          </div>
        )}

        {multiple && files.map((fileObj, index) => (
          <div key={index} className="preview-box">
            <img src={fileObj.url} alt={`Preview ${index}`} />
            <button type="button" className="btn-remove" onClick={() => handleRemove(index)}>×</button>
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
        accept="image/*,video/*"
        style={{ display: 'none' }}
      />
      
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default ImageUploader;
