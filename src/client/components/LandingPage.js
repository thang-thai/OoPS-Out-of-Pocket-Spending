import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import ProtectedApp from './ProtectedApp';
import ProtectedRoutes from './ProtectedRoutes';
import SignUp from './SignUp';

const LandingPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<ProtectedApp />} />
      </Route>
    </Routes>
  );
};

export default LandingPage;
