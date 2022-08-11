import React from 'react';

import './Navbar.css';

const Nav = ({ userInfo, totalExpenses }) => {
  const { id, firstName, lastName } = userInfo;
  return (
    <nav className="main-nav">
      <img className="logo" src={require('../../images/oops.png').default} />
      <div className="logo-name">
        <p>Out</p>
        <p>Of</p>
        <p>Pocket</p>
        <p>Spending</p>
      </div>
      <div className="username">{`Welcome Back, ${firstName} ${lastName}!`}</div>
      <div className="total">Total Expenses: ${totalExpenses.toFixed(2)}</div>
    </nav>
  );
};

export default Nav;
