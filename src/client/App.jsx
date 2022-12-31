import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './routes/landing/landing.component';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from '../client/error-page';
import { AuthProvider } from './contexts/auth.context';
import SignUp from './components/sign-up/sign-up.component';
import Home from './routes/home/home.component';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
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
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
