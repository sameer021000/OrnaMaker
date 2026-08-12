import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputBox from '../../Components_Folder/InputBox_Folder/InputBox';
import PhoneBox from '../../Components_Folder/PhoneBox_Folder/PhoneBox';
import PasswordBox from '../../Components_Folder/PasswordBox_Folder/PasswordBox';
import ProgressBar from '../../Components_Folder/ProgressBar_Folder/ProgressBar';
import SubmitButton from '../../Components_Folder/SubmitButton_Folder/SubmitButton';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    ornaMakerId: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    // clear error on change
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[a-z]/.test(pass)) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/\d/.test(pass)) strength += 1;
    if (/[^a-zA-Z\d]/.test(pass)) strength += 1;
    return strength;
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;

    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required.';
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName = 'Only alphabets allowed, no spaces.';
    }
    
    // Middle name is optional, but if provided, it must be alphabets only
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

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (getPasswordStrength(formData.password) < 5) {
      newErrors.password = 'Password must meet all strength criteria.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    const idRegex = /^[A-Za-z0-9@$_]+$/;
    if (!formData.ornaMakerId) {
      newErrors.ornaMakerId = 'OrnaMaker ID is required.';
    } else if (!idRegex.test(formData.ornaMakerId)) {
      newErrors.ornaMakerId = 'Only alphanumeric, @, $, _ allowed.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Return true if valid, false if invalid for SubmitButton state
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = validate();
        if (isValid) {
          navigate('/professional-details');
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800); // Simulate network/validation delay for effect
    });
  };

  const pStrength = getPasswordStrength(formData.password);

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

        <div className="password-section">
          <PasswordBox
            label="Create Password"
            value={formData.password}
            onChange={handleChange('password')}
            error={errors.password}
            initialVisible={true}
          />
          <ProgressBar strength={pStrength} />
          <ul className="password-hints">
            <li className={formData.password.length >= 8 ? 'met' : ''}>At least 8 characters</li>
            <li className={/[a-z]/.test(formData.password) ? 'met' : ''}>One lowercase letter</li>
            <li className={/[A-Z]/.test(formData.password) ? 'met' : ''}>One uppercase letter</li>
            <li className={/\d/.test(formData.password) ? 'met' : ''}>One number</li>
            <li className={/[^a-zA-Z\d]/.test(formData.password) ? 'met' : ''}>One special character</li>
          </ul>
        </div>

        <PasswordBox
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={errors.confirmPassword}
          initialVisible={false}
        />

        <InputBox
          label="Create OrnaMaker ID"
          value={formData.ornaMakerId}
          onChange={handleChange('ornaMakerId')}
          error={errors.ornaMakerId}
          placeholder="ID (e.g. maker_123$)"
        />
      </div>

      <SubmitButton text="Sign Up" onClick={handleSubmit} />

      <p className="signin-link-text">
        Already have an account?{' '}
        <Link to="/signin" className="signin-link">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
