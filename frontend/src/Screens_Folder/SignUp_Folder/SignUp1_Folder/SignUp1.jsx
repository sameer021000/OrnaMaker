import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputBox from '../../../Components_Folder/InputBox_Folder/InputBox';
import PhoneBox from '../../../Components_Folder/PhoneBox_Folder/PhoneBox';
import SubmitButton from '../../../Components_Folder/SubmitButton_Folder/SubmitButton';
import { useSignUp } from '../../../Context_Folder/SignUpContext';
import './SignUp1.css';

const SignUp1 = () => {
  const navigate = useNavigate();
  const { signUpData, updateSignUpData, clearSignUpData } = useSignUp();
  
  // Local state for the form so we don't update context on every keystroke
  const [formData, setFormData] = useState({
    firstName: signUpData.firstName || '',
    middleName: signUpData.middleName || '',
    lastName: signUpData.lastName || '',
    phone: signUpData.phone || ''
  });
  
  const [errors, setErrors] = useState({});

  // When mounting this first screen, we clear global state to ensure a fresh start
  // as per the requirement: "If OrnaMaker breaks from any of the SignUp screens, 
  // then he should start from the first screen"
  useEffect(() => {
    // If we land here but have data, we've either restarted or refreshed.
    // If you explicitly want to allow them to keep data when they hit back, we wouldn't clear it.
    // However, the requirement says "should not be able to navigate back to first screen".
    // So landing here implies a fresh start.
    clearSignUpData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;

    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required.';
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName = 'Only alphabets allowed, no spaces.';
    }
    
    if (formData.middleName && !nameRegex.test(formData.middleName)) {
      newErrors.middleName = 'Only alphabets allowed, no spaces.';
    }
    
    if (!formData.lastName) {
      newErrors.lastName = 'Last Name is required.';
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName = 'Only alphabets allowed, no spaces.';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = validate();
        if (isValid) {
          // Update global state
          updateSignUpData(formData);
          // Navigate to Step 2 with replace: true to prevent back navigation
          navigate('/signup-step-2', { replace: true });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500); 
    });
  };

  return (
    <div className="screen-container signup-container">
      <div>
        <h1 className="screen-title">Create OrnaMaker Account</h1>
        <p className="screen-subtitle">Join the finest ornament makers network.</p>
      </div>

      <div className="form-group">
        <InputBox
          label="First Name"
          value={formData.firstName}
          onChange={handleChange('firstName')}
          error={errors.firstName}
          placeholder="First"
        />
        <InputBox
          label="Middle Name"
          value={formData.middleName}
          onChange={handleChange('middleName')}
          error={errors.middleName}
          placeholder="Middle"
        />
        <InputBox
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange('lastName')}
          error={errors.lastName}
          placeholder="Last"
        />

        <PhoneBox
          value={formData.phone}
          onChange={handleChange('phone')}
          error={errors.phone}
        />
      </div>

      <SubmitButton text="Next" onClick={handleSubmit} />

      <p className="signin-link-text">
        Already have an account?{' '}
        <Link to="/signin" className="signin-link">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp1;
