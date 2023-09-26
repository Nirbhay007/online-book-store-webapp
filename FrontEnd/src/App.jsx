import { useState } from 'react'
import SignupForm from './components/SignupForm'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './components/ErrorPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import NotFoundPage from "./components/NotFoundPage";
import React from 'react';
const router = createBrowserRouter([
  {
    path: "/register",
    element: <SignupForm />,
    errorElement: <ErrorPage />

  },
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />

  },
  {
    path: "*",
    element: < NotFoundPage />,
  }
]);
function App() {

  return (

    <RouterProvider router={router} />

  )
}

export default App
