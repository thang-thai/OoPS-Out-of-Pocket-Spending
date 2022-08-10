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

  let navigate = useNavigate();
  const homeRoute = () => {
    let path = '/home';
    navigate(path);
  };

  const cancelRoute = () => {
    let path = '/';
    navigate(path);
  };

  const passwordMatch = () => {
    if (password !== confirmedPassword) {
      setPwMatched(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setPassword('');
    setConfirmedPassword('');
    passwordMatch();
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h1 className="welcome">Almost there!</h1>
        <p className="sub-heading">Enter your info below to start tracking</p>
        <form className="signup-form">
          <input
            className="input-login"
            type="text"
            placeholder="First Name"
            onChange={e => {
              setFirstName(e.target.value);
              console.log(firstName);
            }}
            required
          ></input>
          <input
            className="input-login"
            type="text"
            placeholder="Last Name"
            onChange={e => {
              setLastName(e.target.value);
              console.log(lastName);
            }}
            required
          ></input>
          <input
            className="input-login username"
            type="text"
            placeholder="Username"
            onChange={e => {
              setUsername(e.target.value);
              console.log(username);
            }}
            required
          ></input>
          <input
            className="input-login"
            type="password"
            placeholder="Password"
            onChange={e => {
              setPassword(e.target.value);
              console.log(password);
            }}
            required
          ></input>
          <input
            className="input-login"
            type="password"
            placeholder="Confirm Password"
            onChange={e => {
              setConfirmedPassword(e.target.value);
              console.log(confirmedPassword);
            }}
            required
          ></input>
          {!pwMatched ? (
            <p className="pw-failed">Try again, passwords do not match!</p>
          ) : null}
          <button className="confirm-btn" onClick={handleSubmit}>
            Confirm
          </button>
          <button className="cancel-btn" onClick={cancelRoute}>
            I don't want to take control of my expenses
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
