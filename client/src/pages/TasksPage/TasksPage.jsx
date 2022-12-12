import React, { useContext } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import InnerLayout from '../../components/Layout/InnerLayout'

export default function TasksPage() {
  const navigate = useNavigate()
  const { isLoggedIn, isLoading, user } = useContext(AuthContext)

  return (
    <InnerLayout>
      <h1 className="text-2xl font-bold mb-6">Task Management</h1>

      <ul className="tabs">
        <li>
          <NavLink
            to={'/tasks/list'}
            className={({ isActive }) =>
              isActive
                ? 'tab tab-lg tab-lifted tab-active text-primary'
                : 'tab tab-lg tab-lifted'
            }
          >
            All Tasks
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/tasks/new'}
            className={({ isActive }) =>
              isActive
                ? 'tab tab-lg tab-lifted tab-active text-primary'
                : 'tab tab-lg tab-lifted'
            }
          >
            New Task
          </NavLink>
        </li>
      </ul>

      <Outlet />
    </InnerLayout>
  )
}
