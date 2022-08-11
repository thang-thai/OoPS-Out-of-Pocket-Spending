import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        homeRoute();
      }
    });
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1 className="welcome">Welcome Back!</h1>
        <p className="sub-heading">Login to continue tracking your finances</p>
        <input
          className="input-login"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
        ></input>
        <input
          className="input-login"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        ></input>
        <br />
        <button className="login-btn" onClick={handleClick}>
          Sign In
        </button>
        <button className="signup-btn" onClick={signupRoute}>
          Don't have an account? Sign up here!
        </button>
      </div>
    </div>
  );
};

export default Login;
