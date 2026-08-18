import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../../Context_Folder/SignUpContext';
import './OrnaMakerProfile.css';

import ProfileIdentity from './Profile_Components/ProfileIdentity';
import ProfileCraft from './Profile_Components/ProfileCraft';
import ProfileWorkshop from './Profile_Components/ProfileWorkshop';
import ProfileLogistics from './Profile_Components/ProfileLogistics';
import ProfileCredentials from './Profile_Components/ProfileCredentials';

const OrnaMakerProfile = () => {
  const navigate = useNavigate();
  const { signUpData } = useSignUp();

  useEffect(() => {
    if (!signUpData.firstName) {
      navigate('/signup', { replace: true });
    }
  }, [signUpData.firstName, navigate]);

  return (
    <div className="multi-chromatic-profile">
      <ProfileIdentity data={signUpData} />
      <ProfileCraft data={signUpData} />
      <ProfileWorkshop data={signUpData} />
      <ProfileLogistics data={signUpData} />
      <ProfileCredentials data={signUpData} />
    </div>
  );
};

export default OrnaMakerProfile;
