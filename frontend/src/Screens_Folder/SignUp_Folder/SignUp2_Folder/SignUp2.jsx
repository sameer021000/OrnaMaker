import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../../../Components_Folder/InputBox_Folder/InputBox';
import PasswordBox from '../../../Components_Folder/PasswordBox_Folder/PasswordBox';
import ProgressBar from '../../../Components_Folder/ProgressBar_Folder/ProgressBar';
import SubmitButton from '../../../Components_Folder/SubmitButton_Folder/SubmitButton';
import { useSignUp } from '../../../Context_Folder/SignUpContext';
import './SignUp2.css';

const SignUp2 = () => {
  const navigate = useNavigate();
  const { signUpData, updateSignUpData, getEnteredNameMessage } = useSignUp();
  
  // If user refreshed directly on this step, we kick them back to start.
  useEffect(() => {
    if (!signUpData.firstName) {
      navigate('/signup', { replace: true });
    }
  }, [signUpData.firstName, navigate]);

  const [formData, setFormData] = useState({
    password: signUpData.password || '',
    confirmPassword: signUpData.confirmPassword || '',
    ornaMakerId: signUpData.ornaMakerId || ''
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleIdChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/\s/g, '');
    setFormData({ ...formData, ornaMakerId: value });
    if (errors.ornaMakerId) setErrors({ ...errors, ornaMakerId: null });
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

    const idRegex = /^[A-Za-z0-9@$_]{4,}$/;
    if (!formData.ornaMakerId) {
      newErrors.ornaMakerId = 'OrnaMaker ID is required.';
    } else if (formData.ornaMakerId.length < 4) {
      newErrors.ornaMakerId = 'Must be at least 4 characters.';
    } else if (formData.ornaMakerId.length > 10) {
      newErrors.ornaMakerId = 'Must not be more than 10 characters.';
    } else if (!idRegex.test(formData.ornaMakerId)) {
      newErrors.ornaMakerId = 'Only alphanumeric and @, $, _ allowed. No spaces.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = validate();
        if (isValid) {
          updateSignUpData(formData);
          navigate('/professional-details');
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const pStrength = getPasswordStrength(formData.password);

  return (
    <div className="screen-container signup2-container">
      <div>
        <h1 className="screen-title">{getEnteredNameMessage()}</h1>
        <p className="screen-subtitle">Secure your account</p>
      </div>

      <div className="form-group">
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
          onChange={handleIdChange}
          error={errors.ornaMakerId}
          maxLength="10"
          placeholder="ID (e.g. maker_123$)"
        />
      </div>

      <div className="button-group">
        {/* No back button as requested */}
        <SubmitButton text="Next" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default SignUp2;
