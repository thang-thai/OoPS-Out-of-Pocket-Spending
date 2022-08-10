import React from 'react';
import { Navigate, Outlet } from 'react-router';
import Login from './Login';

const useAuth = () => {
  // switch out for a call to DB
  const user = { loggedIn: true };
  // user exists and is logged in
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  let isAuth = useAuth();
  // outlet allows for nested routes
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
