import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [pwMatched, setPwMatched] = useState(true);
  const [userCreated, setUserCreated] = useState(false);

  let navigate = useNavigate();
  const loginRoute = () => {
    let path = '/';
    navigate(path);
  };

  const resetAllFields = () => {
    setFirstName('');
    setLastName('');
    setUsername('');
    setPassword('');
    setConfirmedPassword('');
  };

  const passwordMatch = () => {
    if (password !== confirmedPassword) {
      return setPwMatched(false);
    }
    setPwMatched(true);

    axios
      .post('/signup/add-user', { firstName, lastName, username, password })
      .then(res => console.log(res))
      .catch(err => console.log('ERROR ADDING USER', err));

    resetAllFields();
    setUserCreated(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setPassword('');
    setConfirmedPassword('');
    passwordMatch();
  };

  return (
    <div className="signup">
      <img
        className="logo-signup"
        src={require('../../images/oops.png').default}
      ></img>
      <div className="signup-container">
        <h1 className="welcome">
          {!userCreated ? 'Almost there!' : 'Sign Up Complete!'}
        </h1>
        <p className="sub-heading">
          {!userCreated ? 'Enter your info below to start tracking' : null}
        </p>
        {!userCreated ? (
          <>
            <form className="signup-form">
              <input
                className="input-login"
                value={firstName}
                type="text"
                placeholder="First Name"
                onChange={e => {
                  setFirstName(e.target.value);
                }}
                required
              ></input>
              <input
                className="input-login"
                value={lastName}
                type="text"
                placeholder="Last Name"
                onChange={e => {
                  setLastName(e.target.value);
                }}
                required
              ></input>
              <input
                className="input-login"
                value={username}
                type="text"
                placeholder="Username"
                onChange={e => {
                  setUsername(e.target.value);
                }}
                required
              ></input>
              <input
                className="input-login"
                value={password}
                type="password"
                placeholder="Password"
                onChange={e => {
                  setPassword(e.target.value);
                }}
                required
              ></input>
              <input
                className="input-login"
                value={confirmedPassword}
                type="password"
                placeholder="Confirm Password"
                onChange={e => {
                  setConfirmedPassword(e.target.value);
                }}
                required
              ></input>

              {!pwMatched ? (
                <p className="pw-failed">Try again, passwords do not match!</p>
              ) : null}
              <button className="confirm-btn" onClick={handleSubmit}>
                Confirm
              </button>
              <button className="cancel-btn" onClick={loginRoute}>
                I don't want to take control of my expenses
              </button>
            </form>
          </>
        ) : (
          <button className="cancel-btn" onClick={loginRoute}>
            Click here to login
          </button>
        )}
      </div>
    </div>
  );
};

export default SignUp;
