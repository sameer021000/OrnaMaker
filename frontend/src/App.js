import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { SignUpProvider } from './Context_Folder/SignUpContext';
import SignUp1 from './Screens_Folder/SignUp_Folder/SignUp1_Folder/SignUp1';
import SignUp2 from './Screens_Folder/SignUp_Folder/SignUp2_Folder/SignUp2';
import ProfessionalDetails from './Screens_Folder/SignUp_Folder/ProfessionalDetails_Folder/ProfessionalDetails';
import PersonalDetails from './Screens_Folder/SignUp_Folder/PersonalDetails_Folder/PersonalDetails';
import SignIn from './Screens_Folder/SignIn_Folder/SignIn';
import Home from './Screens_Folder/Home_Folder/Home';
import ActualHome from './Screens_Folder/ActualHome_Folder/ActualHome';
import OrnaMakerProfile from './Screens_Folder/OrnaMakerProfile_Folder/OrnaMakerProfile';
import Reviews from './Screens_Folder/Reviews_Folder/Reviews';

function App() {
  return (
    <SignUpProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp1 />} />
          <Route path="/signup-step-2" element={<SignUp2 />} />
          <Route path="/professional-details" element={<ProfessionalDetails />} />
          <Route path="/personal-details" element={<PersonalDetails />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/actual-home" element={<ActualHome />} />
          <Route path="/profile" element={<OrnaMakerProfile />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/" element={<Navigate to="/signup" replace />} />
        </Routes>
      </BrowserRouter>
    </SignUpProvider>
  );
}

export default App;
