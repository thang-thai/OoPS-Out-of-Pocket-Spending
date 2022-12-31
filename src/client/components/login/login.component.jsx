import axios from 'axios';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import { useNavigate } from 'react-router-dom';
import './login.styles.css';

const Login = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
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

  const handleLogin = async () => {
    try {
      const res = await axios.post('/auth/verifyUser', { username, password });
      if (res) {
        const {
          user_id: id,
          first_name: firstName,
          last_name: lastName,
        } = res.data;
        setCurrentUser({ id, firstName, lastName });
        homeRoute();
      } else {
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      // add better error handling
      console.log(error);
    }
  };

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
        {/* {!currentUser ? (
          <p className="login-failed">
            Username or password incorrect, try again or sign up!
          </p>
        ) : null} */}
        <button
          className="login-btn"
          onClick={() => {
            handleLogin();
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
