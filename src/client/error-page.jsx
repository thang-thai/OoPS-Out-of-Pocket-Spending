import React from 'react';
import { useRouteError } from 'react-router';
import { NavLink } from 'react-router-dom';
import './error-page.styles.css';

// Error page will render for bad routes
const ErrorPage = () => {
  return (
    <div id="error-page">
      <div className="error-message-container">
        <div className="error-message">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <NavLink to="/" className="login-btn">
            Return to Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
