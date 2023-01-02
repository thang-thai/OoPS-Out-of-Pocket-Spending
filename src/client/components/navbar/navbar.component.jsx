import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import { useNavigate } from 'react-router-dom';

import './navbar.styles.css';

const Nav = () => {
  // const { id, firstName, lastName } = userInfo;
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { id, firstName, lastName } = currentUser;
  // const updatedFirst = firstName[0].toUpperCase() + firstName.slice(1);
  // const updatedLast = lastName[0].toUpperCase() + lastName.slice(1);

  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <nav className="main-nav">
      <div className="nav-logo">
        <img className="logo" src={require('../../../images/oops.png').default} />
        {/* <div className="logo-name">
          <p>Out</p>
          <p>Of</p>
          <p>Pocket</p>
          <p>Spending</p>
        </div> */}
      </div>
      {/* <div className="username">{`Welcome Back, ${updatedFirst} ${updatedLast}!`}</div> */}
      {/* <div className="total">Total Expenses: ${totalExpenses.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div> */}
      <button onClick={handleLogout} className="logout">
        Logout
      </button>
    </nav>
  );
};

export default Nav;
