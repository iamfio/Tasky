import { NavLink, Outlet } from 'react-router-dom'

export default function TasksPage() {
  return (
    <div className='flex flex-col items-center'>
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
    </div>
  )
}
