import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.styles.css';

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  homeRoute,
  useAuth,
  signupRoute,
  userExists,
  setUserExists,
}) => {
  return (
    <div className="login">
      <img
        className="logo"
        src={require('../../../images/oops.png').default}
      ></img>
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
        {!userExists ? (
          <p className="login-failed">
            Username or password incorrect, try again or sign up!
          </p>
        ) : null}
        <button
          className="login-btn"
          onClick={() => {
            handleAuth();
            setUsername('');
            setPassword('');
          }}
        >
          Sign In
        </button>
        <button className="signup-btn" onClick={signupRoute}>
          Don't have an account? Sign Up!
        </button>
      </div>
    </div>
  );
};

export default Login;
