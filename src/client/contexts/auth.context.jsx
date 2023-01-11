import { createContext, useState } from 'react';
import React from 'react';

export const AuthContext = createContext({
  currentUser: { id: null, firstName: null, lastName: null },
  setCurrentUser: () => null,
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ id: null, firstName: null, lastName: null });
  const value = { currentUser, setCurrentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
