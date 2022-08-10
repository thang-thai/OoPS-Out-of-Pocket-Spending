import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  let navigate = useNavigate();
  const homeRoute = () => {
    let path = '/home';
    navigate(path);
  };
  const signupRoute = () => {
    let path = '/signup';
    navigate(path);
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1 className="welcome">Welcome Back!</h1>
        <p className="sub-heading">Login to continue tracking your finances</p>
        <input
          className="input-login"
          type="text"
          placeholder="Username"
        ></input>
        <input
          className="input-login"
          type="password"
          placeholder="Password"
        ></input>
        <br />
        <button className="login-btn" onClick={homeRoute}>
          Sign In
        </button>
        <button className="signup-btn" onClick={signupRoute}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
