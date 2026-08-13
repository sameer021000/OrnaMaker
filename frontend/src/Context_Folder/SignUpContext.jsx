import React, { createContext, useState, useContext } from 'react';

const SignUpContext = createContext(null);

export const SignUpProvider = ({ children }) => {
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    ornaMakerId: '',
    work: [],
    sinceWhen: '',
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
    homeLandmark: '',
    profilePic: null,
    shopName: '',
    ornamentTypes: [],
    otherOrnamentType: '',
    teamSize: 'Individual',
    workingHoursFrom: '',
    workingHoursTo: '',
    weeklyHolidays: [],
    workImages: [],
    shopPhotos: [],
    workVideos: [],
    shopVideos: [],
    certificate: []
  });

  const updateSignUpData = (newData) => {
    setSignUpData(prev => ({ ...prev, ...newData }));
  };

  const getEnteredNameMessage = () => {
    if (!signUpData.firstName) return '';
    const name = [signUpData.firstName, signUpData.middleName, signUpData.lastName]
      .filter(Boolean)
      .join(' ');
    return `Welcome, ${name}!`;
  };

  const clearSignUpData = () => {
    setSignUpData({
      firstName: '',
      middleName: '',
      lastName: '',
      phone: '',
      password: '',
      confirmPassword: '',
      ornaMakerId: '',
      work: [],
      sinceWhen: '',
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
      homeLandmark: '',
      profilePic: null,
      shopName: '',
      ornamentTypes: [],
      otherOrnamentType: '',
      teamSize: 'Individual',
      workingHoursFrom: '',
      workingHoursTo: '',
      weeklyHolidays: [],
      workImages: [],
      shopPhotos: [],
      workVideos: [],
      shopVideos: [],
      certificate: []
    });
  };

  return (
    <SignUpContext.Provider value={{ signUpData, updateSignUpData, getEnteredNameMessage, clearSignUpData }}>
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUp = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error('useSignUp must be used within a SignUpProvider');
  }
  return context;
};
