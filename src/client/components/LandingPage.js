import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import ProtectedApp from './ProtectedApp';
import ProtectedRoutes from './ProtectedRoutes';
import SignUp from './SignUp';
import axios from 'axios';

const LandingPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState({});

  let navigate = useNavigate();
  const homeRoute = () => {
    let path = '/home';
    navigate(path);
  };
  const signupRoute = () => {
    let path = '/signup';
    navigate(path);
  };

  const handleClick = () => {
    axios.post('/login/authUser', { username, password }).then(res => {
      if (res.data) {
        const { _id: id, firstName, lastName } = res.data.user[0];
        setUserInfo({ id, firstName, lastName });
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
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            homeRoute={homeRoute}
            handleClick={handleClick}
            signupRoute={signupRoute}
          />
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/home"
          element={
            <ProtectedApp
              username={username}
              password={password}
              userInfo={userInfo}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default LandingPage;
