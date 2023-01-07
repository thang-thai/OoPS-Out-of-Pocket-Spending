import React from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import ErrorPage from '../client/error-page';
import { AuthProvider } from './contexts/auth.context';
import { ExpensesProvider } from './contexts/expenses.context';
import SignUp from './components/sign-up/sign-up.component';
import Home from './routes/home/home.component';
import Login from './components/login/login.component';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <ExpensesProvider>
        <RouterProvider router={router} />
      </ExpensesProvider>
    </AuthProvider>
  );
};

export default App;
