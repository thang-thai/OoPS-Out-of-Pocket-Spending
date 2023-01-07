import React from 'react';
import './sidebar.styles.css';

const SideBar = () => {
  return (
    <div className="sidebar-container">
      <img className="logo" src={require('../../../images/oops.png').default} />
      <div className="sidebar-links">
        <h1>Dashboard</h1>
        <h1>Expenses</h1>
      </div>
    </div>
  );
};

export default SideBar;
