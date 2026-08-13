import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MultiSelectChip from '../../../Components_Folder/MultiSelectChip_Folder/MultiSelectChip';
import DateSelector from '../../../Components_Folder/DateSelector_Folder/DateSelector';
import SubmitButton from '../../../Components_Folder/SubmitButton_Folder/SubmitButton';
import { useSignUp } from '../../../Context_Folder/SignUpContext';
import './ProfessionalDetails.css';

const WORK_OPTIONS = [
  { label: 'Ornament Maker', value: 'maker' },
  { label: 'Ornament Cutting', value: 'cutting' },
  { label: 'Enamel on Ornament', value: 'enamel' },
  { label: 'Ornament Polish', value: 'polish' }
];

const ProfessionalDetails = () => {
  const navigate = useNavigate();
  const { signUpData, updateSignUpData, getEnteredNameMessage } = useSignUp();
  
  // Kick back to start if missing context
  useEffect(() => {
    if (!signUpData.firstName) {
      navigate('/signup', { replace: true });
    }
  }, [signUpData.firstName, navigate]);

  const [formData, setFormData] = useState({
    work: signUpData.work || [],
    sinceWhen: signUpData.sinceWhen || ''
  });
  
  const [errors, setErrors] = useState({});

  const handleWorkChange = (selected) => {
    setFormData({ ...formData, work: selected });
    if (errors.work) setErrors({ ...errors, work: null });
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, sinceWhen: e.target.value });
    if (errors.sinceWhen) setErrors({ ...errors, sinceWhen: null });
  };

  const validate = () => {
    const newErrors = {};

    if (formData.work.length === 0) {
      newErrors.work = 'Please select at least one work category.';
    }

    if (!formData.sinceWhen) {
      newErrors.sinceWhen = 'Please select a date.';
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
          navigate('/personal-details');
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  return (
    <div className="screen-container pro-details-container">
      <div>
        <h1 className="screen-title">{getEnteredNameMessage()}</h1>
        <p className="screen-subtitle">Tell us about your expertise</p>
      </div>

      <div className="form-group">
        <MultiSelectChip
          label="What kind of work do you do?"
          options={WORK_OPTIONS}
          selectedOptions={formData.work}
          onChange={handleWorkChange}
          error={errors.work}
        />

        <DateSelector
          label="Working Since When?"
          value={formData.sinceWhen}
          onChange={handleDateChange}
          error={errors.sinceWhen}
        />
      </div>

      <div className="button-group">
        <button type="button" className="btn-back" onClick={() => navigate('/signup-step-2')}>Back</button>
        <SubmitButton text="Next Step" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default ProfessionalDetails;
