import React from 'react';
import './Navbar.css';

const Nav = () => {
  return (
    <nav className="main-nav">
      <div className="logo">Expenses</div>
      <div className="totals">
        <div className="yearly">$ Total Expenses</div>
      </div>
      <div className="username">Thang Thai</div>
    </nav>
  );
};

export default Nav;
