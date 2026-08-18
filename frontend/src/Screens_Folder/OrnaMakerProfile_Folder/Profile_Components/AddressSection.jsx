import React from 'react';
import './AddressSection.css';

const AddressBlock = ({ title, prefix, data }) => {
  return (
    <div className="address-block">
      <h4 className="address-title">{title}</h4>
      <div className="address-grid">
        <div className="addr-field">
          <span className="addr-label">Street</span>
          <span className="addr-value">{data[`${prefix}Street`]}</span>
        </div>
        <div className="addr-field">
          <span className="addr-label">Landmark</span>
          <span className="addr-value">{data[`${prefix}Landmark`]}</span>
        </div>
        <div className="addr-field">
          <span className="addr-label">City</span>
          <span className="addr-value">{data[`${prefix}City`]}</span>
        </div>
        <div className="addr-field">
          <span className="addr-label">District</span>
          <span className="addr-value">{data[`${prefix}District`]}</span>
        </div>
        <div className="addr-field">
          <span className="addr-label">State</span>
          <span className="addr-value">{data[`${prefix}State`]}</span>
        </div>
        <div className="addr-field">
          <span className="addr-label">Pincode</span>
          <span className="addr-value">{data[`${prefix}Pincode`]}</span>
        </div>
      </div>
    </div>
  );
};

const AddressSection = ({ data }) => {
  return (
    <div className="profile-section address-section">
      <h3 className="section-heading">Location</h3>
      
      <div className="addresses-container">
        <AddressBlock title="Shop Address" prefix="shop" data={data} />
        
        <div className="address-divider"></div>
        
        <AddressBlock title="Home Address" prefix="home" data={data} />
      </div>
    </div>
  );
};

export default AddressSection;
