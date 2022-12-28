import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../../components/login/login.component';
// import ProtectedRoutes from '../../components/ProtectedRoutes';
import SignUp from '../../components/sign-up/sign-up.component';
import axios from 'axios';

const Landing = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [userExists, setUserExists] = useState(true);

  let navigate = useNavigate();
  const homeRoute = () => {
    let path = '/home';
    navigate(path);
  };
  const signupRoute = () => {
    setUserExists(true);
    let path = '/signup';
    navigate(path);
  };

  const useAuth = () => {
    axios.post('/login/authUser', { username, password }).then(res => {
      if (res.data === false) {
        console.log('INSIDE');
        setUserExists(false);
        setUsername('');
        setPassword('');
      } else {
        const { _id: id, firstName, lastName } = res.data;
        setUserInfo({ id, firstName, lastName });
        setUserExists(true);
        homeRoute();
      }
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Login
            setUserExists={setUserExists}
            userExists={userExists}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            homeRoute={homeRoute}
            useAuth={useAuth}
            signupRoute={signupRoute}
          />
        }
      />
      <Route path="/signup" element={<SignUp />} />
      {/* <Route element={<ProtectedRoutes />}>
        <Route
          path="/home"
          element={
            <Home username={username} password={password} userInfo={userInfo} />
          }
        />
      </Route> */}
    </Routes>
  );
};

export default Landing;
