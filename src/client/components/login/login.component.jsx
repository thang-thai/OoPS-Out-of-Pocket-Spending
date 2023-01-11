import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import './login.styles.css';

// Default state for login form fields
const defaultFormFields = {
  username: '',
  password: '',
};

const Login = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const [userExists, setUserExists] = useState(true);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, password } = formFields;

  // Redirects to home route after successful login
  let navigate = useNavigate();
  const homeRoute = () => {
    let path = '/home';
    navigate(path);
  };

  // Handler to update form fields
  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  //  Handler to verify user upon login - error message appears if login failed
  const handleLogin = async () => {
    try {
      const res = await axios.post('/auth/verifyUser', { username, password });
      if (res.data) {
        const { user_id: id, first_name: firstName, last_name: lastName } = res.data;
        setCurrentUser({ id, firstName, lastName });
        homeRoute();
      } else {
        setUserExists(false);
      }
      setFormFields(defaultFormFields);
    } catch (error) {
      setUserExists(false);
    }
  };

  return (
    <div className="login">
      <img className="logo" src={require('../../../images/oops.png').default}></img>
      <div className="login-container">
        {!userExists ? <p className="login-failed">Username or password incorrect. Try again!</p> : null}
        <h1 className="welcome">Welcome Back!</h1>
        <p className="sub-heading">Login to start tracking your finances</p>
        <input className="input-login" type="text" name="username" value={username} onChange={handleChange} placeholder="Username"></input>
        <input className="input-login" type="password" name="password" value={password} onChange={handleChange} placeholder="Password"></input>
        <br />
        <button className="login-btn" onClick={handleLogin}>
          Sign In
        </button>
        <NavLink to="/signup" className="signup-btn">
          Don't have an account? Sign Up!
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
