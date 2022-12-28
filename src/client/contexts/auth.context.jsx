import { createContext } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
