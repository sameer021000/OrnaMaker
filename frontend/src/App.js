import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import SignUp from './Screens_Folder/SignUp_Folder/SignUp';
import SignIn from './Screens_Folder/SignIn_Folder/SignIn';
import ProfessionalDetails from './Screens_Folder/ProfessionalDetails_Folder/ProfessionalDetails';
import PersonalDetails from './Screens_Folder/PersonalDetails_Folder/PersonalDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/professional-details" element={<ProfessionalDetails />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
