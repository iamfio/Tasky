import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'
import HomePage from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import SignupPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'
import IsPrivate from './components/IsPrivate/IsPrivate'
import IsAnon from './components/IsAnon/IsAnon'

import { AuthProviderWrapper } from './context/auth.context'
import './index.css'
import TasksPage from './pages/TasksPage/TasksPage'

const NotFound = () => (
  <>
    <h1>404</h1>
    <p>Do you know, what thats mean?</p>
  </>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
        
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'tasks',
        element: <TasksPage />
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <AuthProviderWrapper>
    <RouterProvider router={router} />
  </AuthProviderWrapper>
)
