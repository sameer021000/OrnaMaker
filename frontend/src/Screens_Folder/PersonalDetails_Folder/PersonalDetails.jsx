import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailBox from '../../Components_Folder/EmailBox_Folder/EmailBox';
import PhoneBox from '../../Components_Folder/PhoneBox_Folder/PhoneBox';
import StateSelector from '../../Components_Folder/StateSelector_Folder/StateSelector';
import InputBox from '../../Components_Folder/InputBox_Folder/InputBox';
import TextAreaBox from '../../Components_Folder/TextAreaBox_Folder/TextAreaBox';
import SubmitButton from '../../Components_Folder/SubmitButton_Folder/SubmitButton';
import './PersonalDetails.css';

const PersonalDetails = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    altPhone: '',
    shopState: '',
    shopDistrict: '',
    shopCity: '',
    shopPincode: '',
    shopStreet: '',
    shopLandmark: '',
    homeState: '',
    homeDistrict: '',
    homeCity: '',
    homePincode: '',
    homeStreet: '',
    homeLandmark: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    // Some components pass value directly, others pass event
    const value = e && e.target ? e.target.value : e;
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const validate = () => {
    const newErrors = {};

    if (formData.altPhone && !/^\d{10}$/.test(formData.altPhone)) {
      newErrors.altPhone = 'Must be exactly 10 digits if provided.';
    }

    const validateAddress = (prefix) => {
      if (!formData[`${prefix}State`]) {
        newErrors[`${prefix}State`] = 'State is required.';
      }

      // District & City: alphabets and exactly one space between words
      const distCityRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
      
      if (!formData[`${prefix}District`]) {
        newErrors[`${prefix}District`] = 'District is required.';
      } else if (!distCityRegex.test(formData[`${prefix}District`])) {
        newErrors[`${prefix}District`] = 'Only alphabets, single space between words.';
      }
      
      if (!formData[`${prefix}City`]) {
        newErrors[`${prefix}City`] = 'City is required.';
      } else if (!distCityRegex.test(formData[`${prefix}City`])) {
        newErrors[`${prefix}City`] = 'Only alphabets, single space between words.';
      }

      if (!formData[`${prefix}Pincode`]) {
        newErrors[`${prefix}Pincode`] = 'Pincode is required.';
      } else if (!/^\d{6}$/.test(formData[`${prefix}Pincode`])) {
        newErrors[`${prefix}Pincode`] = 'Exactly 6 digits required.';
      }

      // Street & Landmark: All chars, only one space between words/letters
      const streetLandmarkRegex = /^[^ ]+( [^ ]+)*$/;
      
      if (!formData[`${prefix}Street`]) {
        newErrors[`${prefix}Street`] = 'Street is required.';
      } else if (!streetLandmarkRegex.test(formData[`${prefix}Street`])) {
        newErrors[`${prefix}Street`] = 'Only one space between words allowed.';
      } else if (formData[`${prefix}Street`].length > 100) {
        newErrors[`${prefix}Street`] = 'Must be 100 characters or less.';
      }

      if (!formData[`${prefix}Landmark`]) {
        newErrors[`${prefix}Landmark`] = 'Landmark is required.';
      } else if (!streetLandmarkRegex.test(formData[`${prefix}Landmark`])) {
        newErrors[`${prefix}Landmark`] = 'Only one space between words allowed.';
      } else if (formData[`${prefix}Landmark`].length > 100) {
        newErrors[`${prefix}Landmark`] = 'Must be 100 characters or less.';
      }
    };

    validateAddress('shop');
    validateAddress('home');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = validate();
        if (isValid) {
          // Finished SignUp flow, redirect to SignIn or dashboard
          navigate('/signin');
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };

  const copyShopToHome = () => {
    setFormData(prev => ({
      ...prev,
      homeState: prev.shopState,
      homeDistrict: prev.shopDistrict,
      homeCity: prev.shopCity,
      homePincode: prev.shopPincode,
      homeStreet: prev.shopStreet,
      homeLandmark: prev.shopLandmark,
    }));
    // Clear home errors
    const newErrors = { ...errors };
    ['homeState', 'homeDistrict', 'homeCity', 'homePincode', 'homeStreet', 'homeLandmark'].forEach(k => delete newErrors[k]);
    setErrors(newErrors);
  };

  return (
    <div className="screen-container personal-details-container">
      <div>
        <h1 className="screen-title">Personal Details</h1>
        <p className="screen-subtitle">Help us reach you easily</p>
      </div>

      <div className="form-group">
        <EmailBox
          value={formData.email}
          onChange={handleChange('email')}
          error={errors.email}
        />

        <PhoneBox
          label="Alternate Phonenumber (Optional)"
          value={formData.altPhone}
          onChange={handleChange('altPhone')}
          error={errors.altPhone}
        />
        
        <div className="address-section">
          <h2 className="section-heading">Shop Address</h2>
          
          <StateSelector
            value={formData.shopState}
            onChange={handleChange('shopState')}
            error={errors.shopState}
          />

          <div className="row-inputs">
            <InputBox
              label="District"
              value={formData.shopDistrict}
              onChange={handleChange('shopDistrict')}
              error={errors.shopDistrict}
            />
            <InputBox
              label="City"
              value={formData.shopCity}
              onChange={handleChange('shopCity')}
              error={errors.shopCity}
            />
          </div>

          <InputBox
            label="Pincode"
            value={formData.shopPincode}
            onChange={handleChange('shopPincode')}
            error={errors.shopPincode}
            maxLength={6}
          />

          <TextAreaBox
            label="Street"
            value={formData.shopStreet}
            onChange={handleChange('shopStreet')}
            error={errors.shopStreet}
          />

          <TextAreaBox
            label="Landmark"
            value={formData.shopLandmark}
            onChange={handleChange('shopLandmark')}
            error={errors.shopLandmark}
          />
        </div>

        <div className="address-section">
          <div className="section-header">
            <h2 className="section-heading">Home Address</h2>
            <button type="button" className="btn-copy" onClick={copyShopToHome}>
              Same as Shop
            </button>
          </div>
          
          <StateSelector
            value={formData.homeState}
            onChange={handleChange('homeState')}
            error={errors.homeState}
          />

          <div className="row-inputs">
            <InputBox
              label="District"
              value={formData.homeDistrict}
              onChange={handleChange('homeDistrict')}
              error={errors.homeDistrict}
            />
            <InputBox
              label="City"
              value={formData.homeCity}
              onChange={handleChange('homeCity')}
              error={errors.homeCity}
            />
          </div>

          <InputBox
            label="Pincode"
            value={formData.homePincode}
            onChange={handleChange('homePincode')}
            error={errors.homePincode}
            maxLength={6}
          />

          <TextAreaBox
            label="Street"
            value={formData.homeStreet}
            onChange={handleChange('homeStreet')}
            error={errors.homeStreet}
          />

          <TextAreaBox
            label="Landmark"
            value={formData.homeLandmark}
            onChange={handleChange('homeLandmark')}
            error={errors.homeLandmark}
          />
        </div>
      </div>

      <div className="button-group">
        <button type="button" className="btn-back" onClick={() => navigate(-1)}>Back</button>
        <SubmitButton text="Finish Sign Up" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default PersonalDetails;
