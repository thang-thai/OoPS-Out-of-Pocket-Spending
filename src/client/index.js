import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Home from './components/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './error-page';

// const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );
