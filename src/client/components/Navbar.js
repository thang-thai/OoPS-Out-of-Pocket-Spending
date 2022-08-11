import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Navbar.css';

const Nav = ({ userInfo, totalExpenses }) => {
  const { id, firstName, lastName } = userInfo;

  const updatedFirst = firstName[0].toUpperCase() + firstName.slice(1);
  const updatedLast = lastName[0].toUpperCase() + lastName.slice(1);

  let navigate = useNavigate();
  const loginRoute = () => {
    let path = '/';
    navigate(path);
  };

  return (
    <nav className="main-nav">
      <img className="logo" src={require('../../images/oops.png').default} />
      <div className="logo-name">
        <p>Out</p>
        <p>Of</p>
        <p>Pocket</p>
        <p>Spending</p>
      </div>
      <div className="username">{`Welcome Back, ${updatedFirst} ${updatedLast}!`}</div>
      <div className="total">
        Total Expenses: $
        {totalExpenses.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </div>
      <button onClick={loginRoute} className="logout">
        Logout
      </button>
    </nav>
  );
};

export default Nav;
