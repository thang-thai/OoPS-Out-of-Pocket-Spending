import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import { ExpensesContext } from '../../contexts/expenses.context';
import { useNavigate } from 'react-router-dom';
import './navbar.styles.css';

const Nav = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const { expensesTotal } = useContext(ExpensesContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <nav className="main-nav">
      <div className="nav-logo">
        <img className="logo" src={require('../../../images/oops.png').default} />
      </div>
      <div className="total">Total Expenses: ${expensesTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
      <button onClick={handleLogout} className="logout">
        Logout
      </button>
    </nav>
  );
};

export default Nav;
