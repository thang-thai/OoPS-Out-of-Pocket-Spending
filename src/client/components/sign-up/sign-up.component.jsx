import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sign-up.styles.css';

const defaultFormFields = {
  email: '',
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  confirmedPassword: '',
};

const SignUp = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [pwMatched, setPwMatched] = useState(true);

  const { email, firstName, lastName, username, password, confirmedPassword } = formFields;

  // Redirects to home page upon sign up and logs user in
  const navigate = useNavigate();
  const homeRoute = () => {
    const path = '/home';
    navigate(path);
  };

  // Navigates to home page when logo is clicked
  const landingRoute = () => {
    const path = '/';
    navigate(path);
  };

  // Handler for updating form fields
  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // Verifies if user exists in DB first. Then, if user doens't exist, adds into DB and redirects to their home page
  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      setFormFields({ ...formFields, password: '', confirmedPassword: '' });
      return setPwMatched(false);
    }
    setPwMatched(true);

    if ((email, firstName, lastName, username)) {
      const res = await axios.post('/auth/addUser', { email, firstName, lastName, username, password });
      if (res) {
        const { user_id: id, first_name: firstName, last_name: lastName } = res.data;
        setCurrentUser({ id, firstName, lastName });
        homeRoute();
      }

      setFormFields(defaultFormFields);
    }
  };

  return (
    <div className="signup-component">
      <img className="logo-signup" src={require('../../../images/oops.png').default} onClick={landingRoute}></img>
      <div className="signup-container">
        {!pwMatched ? <p className="pw-failed">Try again, passwords do not match!</p> : null}
        <div className="signup">
          <h1 className="welcome">Almost there!</h1>
          <p className="sub-heading">Fill in your info below</p>
          <form className="signup-form">
            <input className="input-login" name="firstName" value={firstName} type="text" placeholder="First Name" onChange={handleChange} required></input>
            <input className="input-login" name="lastName" value={lastName} type="text" placeholder="Last Name" onChange={handleChange} required></input>
            <input className="input-login" name="email" value={email} type="email" placeholder="Email" onChange={handleChange} required></input>
            <input className="input-login" name="username" value={username} type="text" placeholder="Username" onChange={handleChange} required></input>
            <input className="input-login" name="password" value={password} type="password" placeholder="Password" onChange={handleChange} required></input>
            <input className="input-login" name="confirmedPassword" value={confirmedPassword} type="password" placeholder="Confirm Password" onChange={handleChange} required></input>
            <button className="confirm-btn" onClick={handleSubmit}>
              Confirm
            </button>
            <NavLink to="/" className="cancel-btn">
              Cancel
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
