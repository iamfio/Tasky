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
import TaskList from './components/TaskList/TaskList'
import TaskNew from './components/TaskList/TaskNew'
import TaskSingle from './components/TaskList/TaskSingle'
import { TasksProvider } from './context/tasks.context'
import { AlarmProvider } from './context/alarm.context'

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
        element: (
          <IsAnon>
            <HomePage />
          </IsAnon>
        ),
      },
      {
        path: 'profile',
        element: (
          <IsPrivate>
            <ProfilePage />
          </IsPrivate>
        ),
      },
      {
        path: 'tasks',
        element: (
          <IsPrivate>
            <TasksPage />
          </IsPrivate>
        ),
        children: [
          {
            path: 'list',
            element: <TaskList />,
            index: true,
          },
          {
            path: 'new',
            element: <TaskNew />,
          },
          {
            path: ':taskId',
            element: <TaskSingle />,
          },
        ],
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
    <AlarmProvider>
      <TasksProvider>
        <RouterProvider router={router} />
      </TasksProvider>
    </AlarmProvider>
  </AuthProviderWrapper>
)
