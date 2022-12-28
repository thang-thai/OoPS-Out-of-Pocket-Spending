import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route } from 'react-router-dom';
import Landing from './routes/landing/landing.component';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './error-page';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//     errorElement: <ErrorPage />,
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Landing />} />)
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
