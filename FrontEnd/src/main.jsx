import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SignupForm from './components/SignupForm.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './components/ErrorPage.jsx';
import LoginPage from './components/LoginPage.jsx';


const router = createBrowserRouter([
  {
    path: "/register",
    element: <SignupForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <LoginPage />,

  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);