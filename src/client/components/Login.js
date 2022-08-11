import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  homeRoute,
  handleClick,
  signupRoute,
}) => {
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
          Don't have an account? Sign up now!
        </button>
      </div>
    </div>
  );
};

export default Login;
