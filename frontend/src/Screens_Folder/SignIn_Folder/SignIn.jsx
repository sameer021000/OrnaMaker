import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PhoneBox from '../../Components_Folder/PhoneBox_Folder/PhoneBox';
import PasswordBox from '../../Components_Folder/PasswordBox_Folder/PasswordBox';
import SubmitButton from '../../Components_Folder/SubmitButton_Folder/SubmitButton';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = validate();
        if (isValid) {
          // Success
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };

  return (
    <div className="screen-container signin-container">
      <div className="signin-header">
        <h1 className="screen-title">Welcome Back</h1>
        <p className="screen-subtitle">Sign in to your OrnaMaker account.</p>
      </div>

      <div className="form-group signin-form-group">
        <PhoneBox
          value={formData.phone}
          onChange={handleChange('phone')}
          error={errors.phone}
        />

        <PasswordBox
          label="Password"
          value={formData.password}
          onChange={handleChange('password')}
          error={errors.password}
          initialVisible={false}
        />
      </div>

      <SubmitButton text="Sign In" onClick={handleSubmit} className="signin-submit" />

      <p className="signup-link-text">
        Don't have an account?{' '}
        <Link to="/signup" className="signup-link">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
