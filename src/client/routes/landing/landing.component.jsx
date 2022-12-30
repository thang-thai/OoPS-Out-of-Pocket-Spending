import React, { useState, useContext } from 'react';
import { AuthProvider } from '../../contexts/auth.context';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../../components/login/login.component';
import SignUp from '../../components/sign-up/sign-up.component';
import axios from 'axios';
// import ProtectedRoutes from '../../components/ProtectedRoutes';

const Landing = () => {
  // const { currentUser, setCurrentUser } = useContext(AuthProvider);
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

  const handleAuth = async () => {
    const res = await axios.post('/auth/verifyUser', { username, password });
    console.log('res', res);
  };

  const useAuth = () => {
    console.log('here');
    axios.post('/auth/verifyUser', { username, password }).then(res => {
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
            handleAuth={handleAuth}
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
