import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../../Context_Folder/SignUpContext';
import ImageUploader from '../../Components_Folder/ImageUploader_Folder/ImageUploader';
import InputBox from '../../Components_Folder/InputBox_Folder/InputBox';
import MultiSelectChip from '../../Components_Folder/MultiSelectChip_Folder/MultiSelectChip';
import SegmentedControl from '../../Components_Folder/SegmentedControl_Folder/SegmentedControl';
import SubmitButton from '../../Components_Folder/SubmitButton_Folder/SubmitButton';
import './Home.css';

const ORNAMENT_TYPES = [
  { label: 'Rings', value: 'rings' },
  { label: 'Chains', value: 'chains' },
  { label: 'Necklaces', value: 'necklaces' },
  { label: 'Bangles', value: 'bangles' },
  { label: 'Bracelets', value: 'bracelets' },
  { label: 'Earrings', value: 'earrings' },
  { label: 'Anklets', value: 'anklets' },
  { label: 'Pendants', value: 'pendants' },
  { label: 'Custom Designs', value: 'custom' },
  { label: 'Others', value: 'others' }
];

const WORK_MAP = {
  'maker': 'Ornament Maker',
  'cutting': 'Ornament Cutting',
  'enamel': 'Enamel on Ornament',
  'polish': 'Ornament Polish'
};

const TEAM_SIZES = [
  { label: 'Individual', value: 'Individual' },
  { label: '2-5 Members', value: '2-5 Members' },
  { label: '6-10 Members', value: '6-10 Members' },
  { label: '10+ Members', value: '10+ Members' }
];

const DAYS_OF_WEEK = [
  { label: 'Mon', value: 'Mon' },
  { label: 'Tue', value: 'Tue' },
  { label: 'Wed', value: 'Wed' },
  { label: 'Thu', value: 'Thu' },
  { label: 'Fri', value: 'Fri' },
  { label: 'Sat', value: 'Sat' },
  { label: 'Sun', value: 'Sun' },
  { label: 'No Holiday', value: 'No Holiday' }
];

const Home = () => {
  const navigate = useNavigate();
  const { signUpData, updateSignUpData } = useSignUp();

  // Redirect if accessed directly without signup context (temporary)
  useEffect(() => {
    if (!signUpData.firstName) {
      navigate('/signup', { replace: true });
    }
  }, [signUpData.firstName, navigate]);

  const [formData, setFormData] = useState({
    profilePic: signUpData.profilePic || null,
    shopName: signUpData.shopName || '',
    ornamentTypes: signUpData.ornamentTypes || [],
    otherOrnamentType: signUpData.otherOrnamentType || '',
    teamSize: signUpData.teamSize || 'Individual',
    workingHoursFrom: signUpData.workingHoursFrom || '',
    workingHoursTo: signUpData.workingHoursTo || '',
    weeklyHolidays: signUpData.weeklyHolidays || [],
    workImages: signUpData.workImages || [],
    shopPhotos: signUpData.shopPhotos || [],
    workVideos: signUpData.workVideos || []
  });

  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);

  // Calculate profile completion progress dynamically
  useEffect(() => {
    let completed = 0;
    const totalFields = 6; 
    if (formData.profilePic) completed++;
    if (formData.shopName) completed++;
    if (formData.ornamentTypes.length > 0) completed++;
    if (formData.workingHoursFrom && formData.workingHoursTo && formData.weeklyHolidays.length > 0) completed++;
    if (formData.workImages.length > 0) completed++;
    if (formData.shopPhotos.length > 0) completed++;
    
    setProgress(Math.round((completed / totalFields) * 100));
  }, [formData]);

  const handleChange = (field, value) => {
    let newValue = value;
    
    // Constraints for Weekly Holidays
    if (field === 'weeklyHolidays') {
      const previouslyHadNoHoliday = formData.weeklyHolidays.includes('No Holiday');
      const newlyHasNoHoliday = value.includes('No Holiday');
      
      if (newlyHasNoHoliday && !previouslyHadNoHoliday) {
        newValue = ['No Holiday'];
      } else if (newlyHasNoHoliday && previouslyHadNoHoliday && value.length > 1) {
        newValue = value.filter(v => v !== 'No Holiday');
      }
    }

    setFormData({ ...formData, [field]: newValue });
    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.profilePic) newErrors.profilePic = 'Profile picture is mandatory.';
    
    const shopNameRegex = /^[A-Za-z0-9@#$_\-&+*:;!?()[\]]+( [A-Za-z0-9@#$_\-&+*:;!?()[\]]+)*$/;
    if (!formData.shopName) {
      newErrors.shopName = 'Shop name is required.';
    } else if (!shopNameRegex.test(formData.shopName)) {
      newErrors.shopName = 'Invalid characters or multiple spaces.';
    }

    if (formData.ornamentTypes.length === 0) newErrors.ornamentTypes = 'Select at least one type.';
    
    const othersRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
    if (formData.ornamentTypes.includes('others')) {
      if (!formData.otherOrnamentType) {
        newErrors.otherOrnamentType = 'Please specify the ornament type.';
      } else if (!othersRegex.test(formData.otherOrnamentType)) {
        newErrors.otherOrnamentType = 'Only alphabets and single spaces allowed.';
      }
    }

    if (!formData.workingHoursFrom) newErrors.workingHoursFrom = 'Required.';
    if (!formData.workingHoursTo) newErrors.workingHoursTo = 'Required.';
    if (formData.workingHoursFrom && formData.workingHoursTo) {
      const parseTime = (t) => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
      };
      const fromMin = parseTime(formData.workingHoursFrom);
      let toMin = parseTime(formData.workingHoursTo);
      
      if (toMin < fromMin) {
        toMin += 24 * 60; // Night shift
      }
      
      if (toMin === fromMin || toMin - fromMin < 30) {
        newErrors.workingHoursTo = 'At least 30 mins difference required.';
      }
    }

    if (formData.weeklyHolidays.length === 0) {
      newErrors.weeklyHolidays = 'Select at least one option.';
    } else if (formData.weeklyHolidays.length === 7 && !formData.weeklyHolidays.includes('No Holiday')) {
      newErrors.weeklyHolidays = 'You must work at least one day.';
    }

    if (formData.workImages.length === 0) newErrors.workImages = 'Upload at least one work image.';
    if (formData.shopPhotos.length === 0) newErrors.shopPhotos = 'Upload at least one shop photo.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAirProfile = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = validate();
        if (isValid) {
          updateSignUpData(formData);
          alert('Profile Aired Successfully! Your profile is now visible on OrnaMilan.');
          resolve(true);
        } else {
          // Scroll to top to show errors or just let them see red
          resolve(false);
        }
      }, 1000);
    });
  };

  return (
    <div className="home-container">
      {/* 1. Header (Basic Details) */}
      <div className="profile-header card">
        <div className="header-info">
          <h2>{signUpData.firstName} {signUpData.lastName}</h2>
          <p className="maker-id">@{signUpData.ornaMakerId || 'maker'}</p>
          <div className="badges">
            {signUpData.work && signUpData.work.map(w => (
              <span key={w} className="badge">{WORK_MAP[w] || w}</span>
            ))}
          </div>
        </div>
        <div className="progress-ring-container">
          <div className="progress-ring" style={{ background: `conic-gradient(var(--color-gold-main) ${progress}%, var(--color-gold-light) ${progress}%)` }}>
            <div className="progress-inner">{progress}%</div>
          </div>
        </div>
      </div>

      <div className="scroll-content">
        {/* 2. Identity Card */}
        <div className="module-card">
          <h3 className="module-title">Identity</h3>
          <div className="module-body">
            <ImageUploader 
              label="Profile Picture" 
              multiple={false} 
              files={formData.profilePic} 
              onFilesChange={(val) => handleChange('profilePic', val)}
              error={errors.profilePic}
            />
            <InputBox 
              label="Shop Name" 
              value={formData.shopName} 
              onChange={(e) => handleChange('shopName', e.target.value)}
              error={errors.shopName}
              placeholder="e.g. Royal Gems"
            />
          </div>
        </div>

        {/* 3. Craftsmanship Card */}
        <div className="module-card">
          <h3 className="module-title">Craftsmanship</h3>
          <div className="module-body">
            <MultiSelectChip 
              label="Types of Ornaments (At least one)" 
              options={ORNAMENT_TYPES} 
              selectedOptions={formData.ornamentTypes} 
              onChange={(val) => handleChange('ornamentTypes', val)}
              error={errors.ornamentTypes}
            />
            {formData.ornamentTypes.includes('others') && (
              <InputBox 
                label="Please specify 'Others'" 
                value={formData.otherOrnamentType} 
                onChange={(e) => handleChange('otherOrnamentType', e.target.value)}
                error={errors.otherOrnamentType}
                placeholder="e.g. Brooches"
              />
            )}
            <SegmentedControl 
              label="Team Size" 
              options={TEAM_SIZES} 
              selectedValue={formData.teamSize} 
              onChange={(val) => handleChange('teamSize', val)}
            />
          </div>
        </div>

        {/* 4. Operations Card */}
        <div className="module-card">
          <h3 className="module-title">Operations</h3>
          <div className="module-body">
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-gold-dark)', margin: '0 0 -0.5rem 0.25rem' }}>Working Hours</h4>
            <div className="row">
              <InputBox 
                label="From" 
                type="time"
                value={formData.workingHoursFrom} 
                onChange={(e) => handleChange('workingHoursFrom', e.target.value)}
                error={errors.workingHoursFrom}
              />
              <InputBox 
                label="To" 
                type="time"
                value={formData.workingHoursTo} 
                onChange={(e) => handleChange('workingHoursTo', e.target.value)}
                error={errors.workingHoursTo}
              />
            </div>
            <MultiSelectChip 
              label="Weekly Holidays" 
              options={DAYS_OF_WEEK} 
              selectedOptions={formData.weeklyHolidays} 
              onChange={(val) => handleChange('weeklyHolidays', val)}
              error={errors.weeklyHolidays}
            />
          </div>
        </div>

        {/* 5. Gallery Card */}
        <div className="module-card">
          <h3 className="module-title">Showcase Gallery</h3>
          <div className="module-body gap-lg">
            <ImageUploader 
              label="Images of Work (At least one)" 
              multiple={true} 
              files={formData.workImages} 
              onFilesChange={(val) => handleChange('workImages', val)}
              error={errors.workImages}
            />
            <ImageUploader 
              label="Shop Photos (At least one)" 
              multiple={true} 
              files={formData.shopPhotos} 
              onFilesChange={(val) => handleChange('shopPhotos', val)}
              error={errors.shopPhotos}
            />
            <ImageUploader 
              label="Work Videos (Optional)" 
              multiple={true} 
              accept="video/*"
              files={formData.workVideos} 
              onFilesChange={(val) => handleChange('workVideos', val)}
            />
          </div>
        </div>
      </div>

      <div className="sticky-bottom">
        <SubmitButton text="Air Profile" onClick={handleAirProfile} />
      </div>
    </div>
  );
};

export default Home;
