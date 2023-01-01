import axios from 'axios';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import { useNavigate } from 'react-router-dom';
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
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  // const [confirmedPassword, setConfirmedPassword] = useState('');
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const [pwMatched, setPwMatched] = useState(true);
  const [userCreated, setUserCreated] = useState(false);

  const { email, firstName, lastName, username, password, confirmedPassword } = formFields;

  let navigate = useNavigate();
  const loginRoute = () => {
    let path = '/home';
    navigate(path);
  };

  // const resetAllFields = () => {
  //   setFirstName('');
  //   setLastName('');
  //   setUsername('');
  //   setPassword('');
  //   setConfirmedPassword('');
  // };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // confirm that user is created then sign them in to home
  const handleSubmit = e => {
    e.preventDefault();
    setFormFields({ ...formFields, password: '', confirmedPassword: '' });
    setPwMatched(false);
    if (password !== confirmedPassword) {
      return setPwMatched(false);
    }
    // setPwMatched(true);

    // axios
    //   .post('/signup/add-user', { firstName, lastName, username, password })
    //   .then(res => console.log(res))
    //   .catch(err => console.log('ERROR ADDING USER', err));

    // setFormFields(defaultFormFields);
    // setUserCreated(true);
  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   setPassword('');
  //   setConfirmedPassword('');
  //   passwordMatch();
  // };

  return (
    <div className="signup">
      <img className="logo-signup" src={require('../../../images/oops.png').default}></img>
      <div className="signup-container">
        {/* Remove the ternary and directly send them to the home page */}
        <h1 className="welcome">{!userCreated ? 'Almost there!' : 'Sign Up Complete!'}</h1>
        <p className="sub-heading">{!userCreated ? 'Enter your info below to start tracking' : null}</p>
        {!userCreated ? (
          <>
            <form className="signup-form">
              <input className="input-login" name="firstName" value={firstName} type="text" placeholder="First Name" onChange={handleChange} required></input>
              <input className="input-login" name="lastName" value={lastName} type="text" placeholder="Last Name" onChange={handleChange} required></input>
              <input className="input-login" name="email" value={email} type="email" placeholder="Email" onChange={handleChange} required></input>
              <input className="input-login" name="username" value={username} type="text" placeholder="Username" onChange={handleChange} required></input>
              <input className="input-login" name="password" value={password} type="password" placeholder="Password" onChange={handleChange} required></input>
              <input className="input-login" name="confirmedPassword" value={confirmedPassword} type="password" placeholder="Confirm Password" onChange={handleChange} required></input>

              {!pwMatched ? <p className="pw-failed">Try again, passwords do not match!</p> : null}
              <button className="confirm-btn" onClick={handleSubmit}>
                Confirm
              </button>
              <button className="cancel-btn" onClick={loginRoute}>
                Cancel
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
