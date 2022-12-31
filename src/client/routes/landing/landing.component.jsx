import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../../components/login/login.component';
import SignUp from '../../components/sign-up/sign-up.component';
import axios from 'axios';
import Home from '../home/home.component';
// import ProtectedRoutes from '../../components/ProtectedRoutes';

const Landing = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default Landing;
