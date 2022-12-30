import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route } from 'react-router-dom';
import Landing from './routes/landing/landing.component';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from '../client/error-page';
import { AuthProvider } from './contexts/auth.context';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//     errorElement: <ErrorPage />,
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Landing />} errorElement={<ErrorPage />}></Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
